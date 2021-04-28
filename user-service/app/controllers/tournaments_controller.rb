# frozen_string_literal: true

class TournamentsController < ApplicationController

  def create
    url = Rails.application.config.tournament_api + '/tournaments'
    reroute(url, :post, body: {
      user_id: current_user.id, org_id: current_user.orgs.first })
  end

  def delete
    url = Rails.application.config.tournament_api + "/tournaments/#{params[:id]}"
    reroute(url, :delete)
  end

  def index
    url = Rails.application.config.tournament_api + '/tournaments'
    reroute(url, :get)
  end

  def show
    url = Rails.application.config.tournament_api + "/tournaments/#{params[:id]}"
    reroute(url, :get)
  end

  def add_players
    url = Rails.application.config.tournament_api + "/tournaments/#{params[:id]}/players"
    players = Array(TtProfile.find(params[:player_ids])).map do |player|
      {
        player_id: player.id,
        name: player.name,
        rating: player.tournamentrating
      }
    end
    reroute(url, :post, { players: players })
  end

  def remove_players
    url = Rails.application.config.tournament_api + "/tournaments/#{params[:id]}/players"
    reroute(url, :delete, { player_ids: params[:player_ids] })
  end

  def generate_groups
    url = Rails.application.config.tournament_api + "/tournaments/#{params[:id]}/groups"
    reroute(url, :post)
  end

  def generate_playoffs
    url = Rails.application.config.tournament_api + "/tournaments/#{params[:id]}/playoffs"
    reroute(url, :post)
  end

  def update_match
    url = Rails.application.config.tournament_api + "/match/#{params[:id]}"
    body = { sets: params[:sets] }
    reroute(url, :put, body)
  end

  # def create_groups
  #   tour = Tournament.find(params[:id])
  #   tour.generate_groups
  #   render json: tour, status: :created
  # end
  #
  # def create_playoffs
  #   tour = Tournament.find(params[:id])
  #   unless tour.classification_over?
  #     render json: {
  #       error: 'Classification stage is not over. Did all matches finished?',
  #       player_count: tour.players.count,
  #       group_count: tour.groups.count,
  #       expected_matches_count: tour.expected_total_matches,
  #       matches_created_count: tour.groups.map { |gro| gro.matches.count }.reduce(:+),
  #       matches_in_progress_count: tour.groups.map(&:total_matches_in_progress).reduce(:+),
  #       matches_over_count: tour.groups.map(&:total_matches_over).reduce(:+)
  #     }, status: :expectation_failed
  #     return
  #   end
  #   tour.groups_stage_winners!
  #   render json: tour, status: :created
  # end
  #
end
