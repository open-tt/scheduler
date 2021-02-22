# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # Tournaments
  get     '/tournaments'              => 'tournaments#index'
  get     '/tournaments/:id'          => 'tournaments#show'
  post    '/tournaments'              => 'tournaments#create'
  delete  '/tournaments/:id'          => 'tournaments#delete'
  post    '/tournaments/:id/groups'   => 'tournaments#create_groups'
  post    '/tournaments/:id/playoffs' => 'tournaments#create_playoffs'
  post    '/tournaments/:id/players'  => 'tournaments#add_players'
  delete  '/tournaments/:id/players' => 'tournaments#remove_players'

  # Groups
  get '/groups/:id/match' => 'groups#find_match'
  put '/groups/:id/match' => 'groups#create_set'
end
