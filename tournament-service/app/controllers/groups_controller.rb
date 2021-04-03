class GroupsController < ApplicationController
  def find_match
    match = Match.find(params[:id])
    render json: match, status: :ok
  end

  def update_match
    match = Match.find(params[:id])
    params[:sets].each do |set|
      # Update existing sets
      if set['id'] && !set['id'].nil? && !set['id'].empty?
        MatchSet.find(set['id']).update!(
          player1_score: set['player1_score'],
          player2_score: set['player2_score']
        )
        next
      end

      # Create new Sets
      match.match_sets.create!(
        player1_score: set['player1_score'],
        player2_score: set['player2_score']
      )
    end
    render json: match
  end
end
