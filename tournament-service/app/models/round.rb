class Round < ApplicationRecord
  belongs_to :playoff
  has_many :matches
end
