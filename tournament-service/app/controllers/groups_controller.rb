class GroupsController < ApplicationController
  def find_match
    match = Match.find(params[:id])
    render json: match, status: :ok
  end

  def update_match
    match = Match.find(params[:id])
    params[:sets].each do |set|
      score1 = set['player1_score'].nil? || set['player1_score'].empty? ? 0 : set['player1_score']
      score2 = set['player2_score'].nil? || set['player2_score'].empty? ? 0 : set['player2_score']
      # Update existing sets
      if set['id'] && !set['id'].nil? && !set['id'].empty?
        MatchSet.find(set['id']).update!(
          player1_score: score1,
          player2_score: score2
        )
        next
      end

      # Create new Sets
      match.match_sets.create!(
        player1_score: score1,
        player2_score: score2
      )
    end
    # If match belongs to a playoff round, update playoff
    match.round&.playoff&.create_next_round
    render json: match
  end
end
