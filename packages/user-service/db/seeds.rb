# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
POST = Action.http_methods[:post]
GET  = Action.http_methods[:get]
PUT  = Action.http_methods[:put]
DELETE = Action.http_methods[:delete]

Role.destroy_all
Action.destroy_all

player_role         = Role.create!(name: 'player')
admin_role          = Role.create!(name: 'admin')
owner_role          = Role.create!(name: 'owner')
systems_admin_role  = Role.create!(name: 'systems_admin')

users_create_action       = Action.create!(url_regex: '/users',     method: POST)
users_get_one_action      = Action.create!(url_regex: '/users/\d+', method: GET)
users_update_one_action   = Action.create!(url_regex: '/users/\d+', method: PUT)
users_add_role_action     = Action.create!(url_regex: '/users/\d+/roles', method: POST)
users_delete_role_action  = Action.create!(url_regex: '/users/\d+/roles', method: DELETE)

orgs_create_action          = Action.create!(url_regex: '/orgs', method: POST)
orgs_list_action            = Action.create!(url_regex: '/orgs', method: GET)
orgs_update_action          = Action.create!(url_regex: '/orgs/\d+', method: PUT)
orgs_list_users_action      = Action.create!(url_regex: '/orgs/\d+/users', method: GET)
orgs_link_user_action       = Action.create!(url_regex: '/orgs/\d+/users/\d+', method: POST)
orgs_unlink_user_action     = Action.create!(url_regex: '/orgs/\d+/users/\d+', method: DELETE)
orgs_create_address_action  = Action.create!(url_regex: '/orgs/\d+/addresses', method: POST)
orgs_list_addresses_action  = Action.create!(url_regex: '/orgs/\d+/addresses', method: GET)
orgs_update_address_action  = Action.create!(url_regex: '/orgs/\d+/addresses/\d+', method: PUT)
orgs_delete_address_action  = Action.create!(url_regex: '/orgs/\d+/addresses/\d+', method: DELETE)

systems_admin_role.actions = [
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action,

  orgs_create_action,
  orgs_list_action,
  orgs_update_action,
  orgs_list_users_action,
  orgs_link_user_action,
  orgs_unlink_user_action,
  orgs_create_address_action,
  orgs_list_addresses_action,
  orgs_update_address_action,
  orgs_delete_address_action
]

owner_role.actions = [
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action,

  orgs_create_action,
  orgs_list_action,
  orgs_update_action,
  orgs_list_users_action,
  orgs_link_user_action,
  orgs_unlink_user_action,
  orgs_create_address_action,
  orgs_list_addresses_action,
  orgs_update_address_action,
  orgs_delete_address_action
]

admin_role.actions = [
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action,

  orgs_create_action,
  orgs_list_action,
  orgs_update_action,
  orgs_list_users_action,
  orgs_link_user_action,
  orgs_unlink_user_action,
  orgs_create_address_action,
  orgs_list_addresses_action,
  orgs_update_address_action,
  orgs_delete_address_action
]

player_role.actions = [
  users_get_one_action,
  users_update_one_action,

  orgs_create_action,
  orgs_list_action,
  orgs_list_users_action,
  orgs_list_addresses_action
]


