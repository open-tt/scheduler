# frozen_string_literal: true

class ReservationsController < ApplicationController
  def create
    url = Rails.application.config.reservations_api + '/reservations'
    proxy_to_add_user_info(url, :post, {
      host: current_user.id,
      recipient: params[:recipient],
      kind: params[:kind],
      event_date: params[:event_date],
      start_time: params[:start_time],
      end_time: params[:end_time],
      note: params[:note]
    })
  end

  def update
    url = Rails.application.config.reservations_api + "/reservations/#{params[:id]}"
    proxy_to_add_user_info(url, :put, update_reservation_params)
  end

  def delete
    url = Rails.application.config.reservations_api + "/reservations/#{params[:id]}"
    proxy_to_add_user_info(url, :delete)
  end

  def show
    url = Rails.application.config.reservations_api + "/reservations/#{params[:id]}"
    proxy_to_add_user_info(url, :get)
  end

  def index
    url = Rails.application.config.reservations_api + '/reservations'
    proxy_to_add_user_info(url, :get, {}, {
      host: params[:host],
      recipient: params[:recipient],
      recipient_rsvp: params[:recipient_rsvp],
      start_timestamp: params[:start_timestamp]
    })
  end

  private

  def update_reservation_params
    params.permit(
      :recipient_rsvp, :kind, :note
    )
  end

  def proxy_to_add_user_info(url, method = :get, body = {}, query = {})
    success, response_or_error = proxy(url, method, body, query)
    if success
      obj = JSON.parse(response_or_error.body)
      obj.is_a?(Array) ? obj.each { |r| inflate_user_info(r) } : inflate_user_info(obj)
      render json: obj, status: response_or_error.code
    else
      render json: response_or_error, status: :unprocessable_entity
    end
  end

  private

  def inflate_user_info(reservation)
    reservation['host'] = User.find(reservation['host']).name
    reservation['recipient'] = User.find(reservation['recipient']).name
  end
end
