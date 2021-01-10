# frozen_string_literal: true

class TournamentsController < ApplicationController
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

  def add_player
    tour = Tournament.find(add_player_params[:id])
    tour.players = [] if tour.players.nil?
    new_player = {
      id: add_player_params[:player_id],
      name: add_player_params[:name],
      rating: add_player_params[:rating]
    }
    begin
      tour.add_player new_player
      tour.save!
      render json: tour, status: :ok
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def remove_player
    tour = Tournament.find(params[:id])
    tour.remove_player params[:player_id].to_i
    render json: tour, status: :ok
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  def create_groups
    tour = Tournament.find(params[:id])
    tour.generate_groups
    render json: tour, status: :created
  end

  def create_playoffs
    tour = Tournament.find(params[:id])
    unless tour.classification_over?
      render json: {
        error: 'Classification stage is not over. Did all matches finished?',
        total_players: tour.players.count,
        total_groups: tour.groups.count,
        expected_total_matches: tour.expected_total_matches,
        total_matches: tour.groups.map { |gro| gro.matches.count }.reduce(:+)
      }, status: :expectation_failed
      return
    end
    winners = tour.groups_stage_winners
    render json: winners, status: :created
  end

  private

  def create_tournament_params
    params.permit(:user_id, :org_id)
  end

  def add_player_params
    params.permit(:id, :player_id, :name, :rating)
  end
end
