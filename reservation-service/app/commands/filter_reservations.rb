# frozen_string_literal: true

class FilterReservations
  prepend SimpleCommand

  def initialize(host, recipient, recipient_rsvp, start_timestamp)
    @host = host
    @recipient = recipient
    @recipient_rsvp = recipient_rsvp
    @start_timestamp = start_timestamp
  end

  def call
    resp = Reservation.where(gen_filter_hash)
    resp.to_a
  end

  private

  attr_accessor :host, :recipient, :recipient_rsvp, :start_timestamp

  def gen_filter_hash
    hash = {}
    hash[:host] = host.to_i unless host.nil? || host.empty?
    hash[:recipient] = recipient.to_i unless recipient.nil? || recipient.empty?
    hash[:recipient_rsvp] = recipient_rsvp unless recipient_rsvp.nil? || recipient_rsvp.empty?
    hash[:start_timestamp] = start_timestamp.to_i unless start_timestamp.nil? || start_timestamp.empty?
    hash
  end
end
