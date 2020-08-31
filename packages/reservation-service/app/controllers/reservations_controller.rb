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
  end

  def delete
  end

  def show
  end

  def index
  end

  private

  def create_reservation_params
    params.permit(:location_id, :user_id, :coach_id, :start_timestamp, :duration_in_minutes, :size, :kind)
  end
end
