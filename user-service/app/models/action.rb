class Action < ApplicationRecord
  has_and_belongs_to_many :roles

  enum http_methods: %i[get post put del options patch]
end
