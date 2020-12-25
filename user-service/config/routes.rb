# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # Authentication
  post 'authenticate' => 'authentication#authenticate'

  # Users (Code in this Project user-service)
  post    '/users'            => 'users#register'
  post    '/users/partial'    => 'users#soft_register' # todo
  get     '/current_user'     => 'users#show_current_user'
  get     '/users/:id'        => 'users#show'
  get     '/users/:id/tournament_data' => 'users#show_tournament_data'
  put     '/users/:id'        => 'users#edit'
  post    '/users/:id/roles'  => 'users#add_role'
  delete  '/users/:id/roles'  => 'users#remove_role'

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
  post '/tournaments' => 'tournaments#create' # todo
  delete '/tournaments' => 'tournaments#delete' # todo
  post '/tournaments/:id/players/:player_id' => 'tournaments#add_player' # todo
  delete '/tournaments/:id/players/:player_id' => 'tournaments#remove_player' # todo
  post '/tournaments/:id/groups' => 'tournaments#create_groups' # todo
  put '/tournaments/:id/groups' => 'tournaments#update_group' # todo
  post '/tournaments/:id/playoffs' => 'tournaments#create_playoffs' # todo
end
