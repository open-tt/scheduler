# frozen_string_literal: true

class TournamentsController < ApplicationController
  def index
    render json: { tournaments: Tournament.all }, status: :ok
  end

  def show
    render json:  Tournament.find(params[:id]), status: :ok
  end

  def create
    tour = Tournament.new(creator: create_tournament_params, stage: Tournament.stages[:registration], scheduled_at: Date
                                                                                                              .current)
    if tour.save
      render json: tour, status: :created
    else
      render json: { errors: tour.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def delete
    Tournament.find(params[:id]).destroy
    render status: :no_content # Success
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  def add_players
    tour = Tournament.find(add_player_params[:id])
    begin
      params[:players].each do |p|
        n_player = {
          id: p[:player_id],
          name: p[:name],
          rating: p[:rating]
        }
        tour.add_player n_player
      end
      tour.reload
      render json: tour, status: :created
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def remove_players
    tour = Tournament.find(params[:id])
    params[:player_ids].each do |id|
      tour.remove_player id.to_i
    end
    tour.save!
    render json: tour, status: :ok
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  def create_groups
    tour = Tournament.find(params[:id])
    tour.generate_groups
    render json: tour, status: :created
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  def create_playoffs
    tour = Tournament.find(params[:id])
    unless tour.classification_over?
      render json: {
        error: 'Classification stage is not over. Did all matches finished?',
        player_count: tour.players.count,
        group_count: tour.groups.count,
        expected_matches_count: tour.expected_total_matches,
        matches_created_count: tour.groups.map { |gro| gro.matches.count }.reduce(:+),
        matches_in_progress_count: tour.groups.map(&:total_matches_in_progress).reduce(:+),
        matches_over_count: tour.groups.map(&:total_matches_over).reduce(:+)
      }, status: :expectation_failed
      return
    end
    tour.groups_stage_winners!
    render json: tour, status: :created
  end

  def update_playoffs_match
    playoff = Playoff.find(params[:id])
    playoff.update_match(
      params[:player1],
      params[:player1_score],
      params[:player2],
      params[:player2_score]
    )
    playoff.create_next_round if playoff.rounds.last.is_over? && !playoff.rounds.last.is_final?
    render json: playoff.tournament
  end

  private

  def create_tournament_params
    params.permit(:user_id, :org_id)
  end

  def add_player_params
    params.permit(:id, :player_id, :name, :rating)
  end
end
