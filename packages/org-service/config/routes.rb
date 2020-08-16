# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # Users
  post '/orgs' => 'org#create'
  get    '/orgs' => 'org#org_search'
  put    '/orgs/:id' => 'org#update'
  post '/orgs/:id/users/:user_id' => 'org#add_user'
  delete '/orgs/:id/users/:user_id' => 'org#remove_user'
  post '/orgs/:id/addresses' => 'org#add_address'
  get '/orgs/:id/addresses' => 'org#all_addresses'

end
