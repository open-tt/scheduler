# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Role.destroy_all
Action.destroy_all

player_role         = Role.create!(name: 'player')
admin_role          = Role.create!(name: 'admin')
owner_role          = Role.create!(name: 'owner')
systems_admin_role  = Role.create!(name: 'systems_admin')

users_create_action       = Action.create!(url_regex: '/users',     method: Action.http_methods[:post])
users_get_one_action      = Action.create!(url_regex: '/users/\d+', method: Action.http_methods[:get])
users_update_one_action   = Action.create!(url_regex: '/users/\d+', method: Action.http_methods[:put])
users_add_role_action     = Action.create!(url_regex: '/users/\d+/roles', method: Action.http_methods[:post])
users_delete_role_action  = Action.create!(url_regex: '/users/\d+/roles', method: Action.http_methods[:delete])

systems_admin_role.actions = [
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action
]

owner_role.actions = [
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action
]

admin_role.actions = [
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action
]

player_role.actions = [
  users_get_one_action,
  users_update_one_action
]


