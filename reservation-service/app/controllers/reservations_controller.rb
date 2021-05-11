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
      render_not_found(Reservation.name, params[:id])
    elsif reservation.update!(update_reservation_params)
      render json: reservation
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
      render_not_found(Reservation.name, params[:id])
    else
      render json: reservation, status: :ok
    end
  end

  def index
    reservations = FilterReservations.call(
      index_params[:host],
      index_params[:recipient],
      index_params[:recipient_rsvp],
      index_params[:start_timestamp]
    )

    # render json: reservations.result, status: :ok
    render json: reservations.result, status: :ok
  end

  private

  def create_reservation_params
    raw_params = params.permit(:event_date, :start_time, :end_time,
                               :kind, :host,
                               :recipient, :recipient_rsvp, :note)

    # We need to transform Date, Time, Time into start and end timestamps
    ev_date = DateTime.parse(raw_params[:event_date])
    s_time = Time.parse(raw_params[:start_time])
    e_time = Time.parse(raw_params[:start_time])

    raw_params[:start_timestamp] = ev_date.midnight + s_time.hour.hours + s_time.min.minutes
    raw_params[:end_timestamp] = ev_date.midnight + e_time.hour.hours + e_time.min.minutes
    raw_params.delete(:event_date)
    raw_params.delete(:start_time)
    raw_params.delete(:end_time)
    raw_params
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
