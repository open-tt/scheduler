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

  private

  def create_tournament_params
    params.permit(:user_id, :org_id)
  end
end
