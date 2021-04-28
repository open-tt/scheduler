# frozen_string_literal: true

class ReservationsController < ApplicationController
  def create
    reservation = Reservation.new(create_reservation_params)
    if reservation.save!
      render json: reservation, status: :created
    else
      render_failed_create_new_object reservation
    end
  rescue StandardError => e
    render_exception_as_json e
  end

  def update
    reservation = Reservation.find_by_id(params[:id])
    if reservation.nil?
      render_not_found(Reservation.class.name, params[:id])
    elsif reservation.update!(update_reservation_params)
      render_object reservation
    else
      render_failed_update_object reservation
    end
  rescue StandardError => e
    render_exception_as_json e
  end

  def delete
    reservation = Reservation.find_by_id(params[:id])
    reservation&.destroy
    # renders 204
  end

  def show
    reservation = Reservation.find_by_id(params[:id])
    if reservation.nil?
      render_not_found(Reservation.class, params[:id])
    else
      render_object reservation
    end
  end

  def index
    reservations = FilterReservations.call(
      index_params[:host],
      index_params[:recipient],
      index_params[:recipient_rsvp],
      index_params[:start_timestamp]
    )
    render_object_array reservations.result
  end

  private

  def create_reservation_params
    params.permit(:start_timestamp, :kind, :host,
                  :recipient, :recipient_rsvp, :end_timestamp, :note)
  end

  def update_reservation_params
    params.permit(
      :start_timestamp, :end_timestamp, :recipient_rsvp, :kind, :note
    )
  end

  def index_params
    params.permit(:host, :recipient, :recipient_rsvp, :start_timestamp)
  end
end
