class TtProfile < ApplicationRecord
  belongs_to :user, required: false

  validates :usattid, uniqueness: true, allow_nil: true
end
