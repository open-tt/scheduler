# frozen_string_literal: true

class TournamentsController < ApplicationController
  def create
    url = Rails.application.config.tournament_service_host + '/tournaments'

    begin
      response = HTTParty.post(url,
                               body: { user_id: current_user.id, org_id: current_user.orgs.first })
      resp_json = response.as_json
      if response.code != 201
        render json: {
          error: resp_json['exception'].remove("\t").split("\n")
        }, status: :internal_server_error
      else
        render json: response.body.as_json, status: :created
      end
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def delete
    url = Rails.application.config.tournament_service_host + "/tournaments/#{params[:id]}"
    begin
      response = HTTParty.delete(url)
      resp_json = response.as_json
      if response.code != 204
        error = if resp_json['exception'].nil?
                  response.body.as_json
                else
                  resp_json['exception'].remove("\t").split("\n")
                end
        render json: {
          error: error
        }, status: :internal_server_error # Error
      else
        render status: :no_content # Success
      end
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error # Error
    end
  end
end
