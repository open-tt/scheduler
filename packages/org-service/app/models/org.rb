class Org < ApplicationRecord
  has_many :addresses
  has_many :orgs_users
end
