class Org < ApplicationRecord
  has_many :addresses
  has_and_belongs_to_many :users
end
