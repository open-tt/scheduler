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
    h = host.to_i unless host.nil? || host.empty?
    r = recipient.to_i unless recipient.nil? || recipient.empty?

    resp = Reservation.where(
      host: [h, r]
    ).or(
      Reservation.where(
        recipient: [h, r]
      )
    )
    resp.to_a
  end

  private

  attr_accessor :host, :recipient, :recipient_rsvp, :start_timestamp
end
