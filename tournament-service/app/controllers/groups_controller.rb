class GroupsController < ApplicationController
  def find_match
    group = Group.find(params[:id])
    p1 = +params[:player1].to_i
    p2 = +params[:player2].to_i
    should_create = params[:should_create] == 'true'
    match = group.matches.find do |matches|
      [matches.player1_id, matches.player2_id].include? p1 and
        [matches.player1_id, matches.player2_id].include? p2
    end

    match = group.matches.create!(best_of: 5, player1_id: p1, player2_id: p2) if match.nil? && should_create

    if match.nil?
      render json: { error: 'Match does not exist', player1: p1, player2: p2 }, status: :not_found
      return
    end

    render json: match, status: :ok
  end

  def create_set
    group = Group.find(params[:id])
    p1 = params[:player1].to_i
    p1_score = params[:player1_score].to_i
    p2 = params[:player2].to_i
    p2_score = params[:player2_score].to_i

    match = group.matches.find do |matches|
      [matches.player1_id, matches.player2_id].include? p1 and
        [matches.player1_id, matches.player2_id].include? p2
    end

    if match.is_over?
      render json: { error: "Cannot add set to match {#{match.id}} that has already finished. Winner #{match.winner}" },
             status: :expectation_failed
      return
    end

    if match.match_sets.count >= match.best_of
      render json: { error: 'All sets for this match already created. Did you mean to update an existing one?' },
             status: :expectation_failed
      return
    end

    if match.nil?
      render json: { error: 'Match does not exist', player1: p1, player2: p2 }, status: :not_found
      return
    end

    set = match.match_sets.create!(player1_id: p1, player1_score: p1_score, player2_id: p2, player2_score: p2_score)
    render json: match
  end

  def update_match
    groups
  end
end
