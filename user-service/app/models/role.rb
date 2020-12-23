class Role < ApplicationRecord
  has_and_belongs_to_many :users
  has_and_belongs_to_many :actions

  enum default_role: %i[player admin owner systems_admin]

  def self.list
    Role.all.pluck(:name)
  end

  def self.player
    Role.find_by_name('player')
  end

  def self.admin
    Role.find_by_name('admin')
  end

  def self.owner
    Role.find_by_name('owner')
  end

  def self.systems_admin
    Role.find_by_name('systems_admin')
  end
end
