class Playoff < ApplicationRecord
  belongs_to :tournament
  has_many :matches
  has_many :rounds
end
