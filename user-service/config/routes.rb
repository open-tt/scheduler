# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # Authentication
  post 'authenticate' => 'authentication#authenticate'

  # Players
  post    '/ttprofiles/import'     => 'tt_profile#import'
  get     '/ttprofiles'           => 'tt_profile#index'
  get     '/players'              => 'users#index_with_tt_profiles'

  # Users (Code in this Project user-service)
  post    '/users'            => 'users#register'
  get     '/users'            => 'users#search_users'
  post    '/users/partial'    => 'users#soft_register'
  get     '/current_user'     => 'users#show_current_user'
  get     '/users/:id'        => 'users#show'
  get     '/users/:id/tournament_data' => 'users#show_tournament_data'
  put     '/users/:id'        => 'users#edit'
  post    '/users/:id/roles'  => 'users#add_role'
  delete  '/users/:id/roles'  => 'users#remove_role'
  patch   '/users/:id/password' => 'users#change_password'
  put     '/users/:id/tt_profile' => 'users#edit_tt_profile'

  # Org (Code in this Project user-service)
  post    '/orgs' => 'org#create'
  get     '/orgs' => 'org#org_search'
  put     '/orgs/:id' => 'org#update'
  get     '/orgs/:id/users' => 'org#all_users'
  post    '/orgs/:id/users/:user_id' => 'org#add_user'
  delete  '/orgs/:id/users/:user_id' => 'org#remove_user'
  post    '/orgs/:id/addresses' => 'org#add_address'
  get     '/orgs/:id/addresses' => 'org#all_addresses'
  put     '/orgs/:id/addresses/:address_id' => 'org#update_address'
  delete  '/orgs/:id/addresses/:address_id' => 'org#unlink_address'

  # Tournaments (Micro-Service code in Project tournament-service)
  get     '/tournaments' => 'tournaments#index'
  get     '/tournaments/:id' => 'tournaments#show'
  post    '/tournaments' => 'tournaments#create'
  delete  '/tournaments/:id' => 'tournaments#delete'
  post    '/tournaments/:id/players' => 'tournaments#add_players'
  delete  '/tournaments/:id/players' => 'tournaments#remove_players'
  post    '/tournaments/:id/groups' => 'tournaments#generate_groups'
  put     '/tournaments/:id/groups' => 'tournaments#update_group' # todo
  post    '/tournaments/:id/playoffs' => 'tournaments#generate_playoffs'
  get     '/groups/:id' => 'tournaments#show_group' # todo
  put     '/match/:id' => 'tournaments#update_match' # todo
  get     '/match/:id' => 'tournaments#show_match' # todo

  # Reservations
  post   '/reservations' => 'reservations#create'
  get    '/reservations' => 'reservations#index'
  put    '/reservations/:id' => 'reservations#update'
  get    '/reservations/:id' => 'reservations#show'
  delete '/reservations/:id' => 'reservations#delete'
end
