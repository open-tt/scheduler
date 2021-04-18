class TtProfile < ApplicationRecord
  validates :usattid, uniqueness: true, allow_nil: true
end
