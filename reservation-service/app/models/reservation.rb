# frozen_string_literal: true

class Reservation < ApplicationRecord
  enum kind: %i[play lesson train]
  enum recipient_rsvp: %i[yes no maybe]
end
