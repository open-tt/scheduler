# frozen_string_literal: true

class FilterReservations
  prepend SimpleCommand

  def initialize(user_id, location_id, start_timestamp)
    @user_id = user_id
    @location_id = location_id
    @start_timestamp = start_timestamp
  end

  def call
    resp = Reservation.where(gen_filter_hash)
    resp.to_a
  end

  private

  attr_accessor :user_id, :location_id, :start_timestamp

  def gen_filter_hash
    hash = {}
    hash[:user_id] = user_id unless user_id.nil?
    hash[:location_id] = location_id unless location_id.nil?
    hash[:start_timestamp] = start_timestamp unless start_timestamp.nil?
    hash
  end
end
