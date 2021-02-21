class Player < ApplicationRecord
  validates :usattid, uniqueness: true, allow_nil: true
end
