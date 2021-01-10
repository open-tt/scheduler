# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # Tournaments
  post    '/tournaments'              => 'tournaments#create'
  delete  '/tournaments/:id'          => 'tournaments#delete'
  post    '/tournaments/:id/groups'   => 'tournaments#create_groups'
  post    '/tournaments/:id/playoffs' => 'tournaments#create_playoffs'
  post    '/tournaments/:id/players'  => 'tournaments#add_player'
  delete  '/tournaments/:id/players/:player_id' => 'tournaments#remove_player'

  # Groups
  get '/groups/:id/match' => 'groups#find_match'
  put '/groups/:id/match' => 'groups#create_set'
end
