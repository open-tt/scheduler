# frozen_string_literal: true

class ReservationsController < ApplicationController
  def create
    url = Rails.application.config.reservations_api + '/reservations'
    reroute(url, :post, {
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
    reroute(url, :put, update_reservation_params)
  end

  def delete
    url = Rails.application.config.reservations_api + "/reservations/#{params[:id]}"
    reroute(url, :delete)
  end

  def show
    url = Rails.application.config.reservations_api + "/reservations/#{params[:id]}"
    reroute(url, :get)
  end

  def index
    url = Rails.application.config.reservations_api + '/reservations'
    reroute(url, :get, {}, {
      host: params[:host],
      recipient: params[:recipient],
      recipient_rsvp: params[:recipient_rsvp],
      start_timestamp: params[:start_timestamp]
    })
  end

  private

  def update_reservation_params
    params.permit(
      :start_timestamp, :end_timestamp, :recipient_rsvp, :kind, :note
    )
  end

end
