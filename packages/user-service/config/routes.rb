# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # QuickAuth
  # get '/quickauth/user1' => 'quick_auth#user1_auth'
  # get '/quickauth/club1' => 'quick_auth#club1_auth'

  # Org
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

  # Users
  post    '/users'            => 'users#register'
  get     '/users/:id'        => 'users#show'
  put     '/users/:id'        => 'users#edit'
  post    '/users/:id/roles'  => 'users#add_role'
  delete  '/users/:id/roles'  => 'users#remove_role'

  # Authentication
  post 'authenticate' => 'authentication#authenticate'
end
