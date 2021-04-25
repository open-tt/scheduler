# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup.
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }]
#   Character.create(name: 'Luke', movie: movies.first)
POST = Action.http_methods[:post]
GET  = Action.http_methods[:get]
PUT  = Action.http_methods[:put]
DELETE = Action.http_methods[:del]
PATCH = Action.http_methods[:patch]

# Role.destroy_all
# Action.destroy_all

player_role         = Role.where(name: 'player').first_or_create!
admin_role          = Role.where(name: 'admin').first_or_create!
owner_role          = Role.where(name: 'owner').first_or_create!
systems_admin_role  = Role.where(name: 'systems_admin').first_or_create!

users_create_action       = Action.where(url_regex: '/users', method: POST).first_or_create!
users_current_user_action = Action.where(url_regex: '/current_user', method: GET).first_or_create!
users_get_one_action      = Action.where(url_regex: '/users/\d+', method: GET).first_or_create!
users_update_one_action   = Action.where(url_regex: '/users/\d+', method: PUT).first_or_create!
users_add_role_action     = Action.where(url_regex: '/users/\d+/roles', method: POST).first_or_create!
users_delete_role_action  = Action.where(url_regex: '/users/\d+/roles', method: DELETE).first_or_create!
users_change_password_action = Action.where(url_regex: '/users/\d+/password', method: PATCH).first_or_create!
users_edit_tt_profile_action = Action.where(url_regex: '/users/\d+/tt_profile', method: PUT).first_or_create!

players_get_all_action    = Action.where(url_regex: '/players', method: GET).first_or_create!

orgs_create_action          = Action.where(url_regex: '/orgs', method: POST).first_or_create!
orgs_list_action            = Action.where(url_regex: '/orgs', method: GET).first_or_create!
orgs_update_action          = Action.where(url_regex: '/orgs/\d+', method: PUT).first_or_create!
orgs_list_users_action      = Action.where(url_regex: '/orgs/\d+/users', method: GET).first_or_create!
orgs_link_user_action       = Action.where(url_regex: '/orgs/\d+/users/\d+', method: POST).first_or_create!
orgs_unlink_user_action     = Action.where(url_regex: '/orgs/\d+/users/\d+', method: DELETE).first_or_create!
orgs_create_address_action  = Action.where(url_regex: '/orgs/\d+/addresses', method: POST).first_or_create!
orgs_list_addresses_action  = Action.where(url_regex: '/orgs/\d+/addresses', method: GET).first_or_create!
orgs_update_address_action  = Action.where(url_regex: '/orgs/\d+/addresses/\d+', method: PUT).first_or_create!
orgs_delete_address_action  = Action.where(url_regex: '/orgs/\d+/addresses/\d+', method: DELETE).first_or_create!

tournaments_create_action   = Action.where(url_regex: '/tournaments', method: POST).first_or_create!
tournaments_list_action     = Action.where(url_regex: '/tournaments', method: GET).first_or_create!
tournaments_get_action      = Action.where(url_regex: '/tournaments/\d+', method: GET).first_or_create!
tournaments_delete_action   = Action.where(url_regex: '/tournaments/\d+', method: DELETE).first_or_create!
tournaments_add_players_action = Action.where(url_regex: '/tournaments/\d+/players', method: POST).first_or_create!
tournaments_create_groups_action = Action.where(url_regex: '/tournaments/\d+/groups', method: POST).first_or_create!
tournaments_create_playoffs_action = Action.where(url_regex: '/tournaments/\d+/playoffs', method: POST).first_or_create!

tour_groups_update_match = Action.where(url_regex: '/match/\d+', method: PUT).first_or_create!

systems_admin_role.actions = [
  # Tournament Group actions
  tour_groups_update_match,
  tournaments_create_playoffs_action,

  tournaments_create_groups_action,

  tournaments_add_players_action,
  players_get_all_action,

  users_current_user_action,
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action,
  users_change_password_action,
  users_edit_tt_profile_action,

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
  # Tournament Group actions
  tour_groups_update_match,
  tournaments_create_playoffs_action,

  tournaments_create_groups_action,

  tournaments_add_players_action,
  players_get_all_action,

  users_get_one_action,
  users_current_user_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action,
  users_change_password_action,
  users_edit_tt_profile_action,

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
  # Tournament Group actions
  tour_groups_update_match,
  tournaments_create_playoffs_action,

  tournaments_create_groups_action,

  tournaments_add_players_action,
  players_get_all_action,

  users_current_user_action,
  users_get_one_action,
  users_update_one_action,
  users_add_role_action,
  users_delete_role_action,
  users_change_password_action,
  users_edit_tt_profile_action,

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
  # Tournament Group actions
  tour_groups_update_match,
  tournaments_create_playoffs_action,

  tournaments_create_groups_action,

  tournaments_add_players_action,
  players_get_all_action,

  users_current_user_action,
  users_get_one_action,
  users_update_one_action,
  users_change_password_action,
  users_edit_tt_profile_action,

  orgs_create_action,
  orgs_list_action,
  orgs_list_users_action,
  orgs_list_addresses_action,

  # TODO, should a player have this permissions ...?
  tournaments_create_action,
  tournaments_get_action,
  tournaments_list_action,
  tournaments_delete_action
]


