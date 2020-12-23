# frozen_string_literal: true

class ReservationsController < ApplicationController
  def create
    reservation = Reservation.new(create_reservation_params)
    if reservation.save!
      render_created_object reservation
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
      index_params[:user_id],
      index_params[:location_id],
      index_params[:start_timestamp]
    )
    render_object_array reservations.result
  end

  private

  def create_reservation_params
    params.permit(:location_id, :user_id, :coach_id, :start_timestamp, :duration_in_minutes, :size, :kind)
  end

  def update_reservation_params
    params.permit(:start_timestamp, :duration_in_minutes, :size)
  end

  def index_params
    params.permit(:user_id, :location_id, :start_timestamp)
  end
end
