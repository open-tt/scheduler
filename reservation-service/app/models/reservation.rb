class Reservation < ApplicationRecord
  enum kind: [:play, :lesson]
end
