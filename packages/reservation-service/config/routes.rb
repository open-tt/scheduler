# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  # QuickAuth
  # get '/quickauth/user1' => 'quick_auth#user1_auth'
  # get '/quickauth/club1' => 'quick_auth#club1_auth'

  # Users
  post      '/schedules' => 'schedules#create'
  put       '/schedules/:id' => 'schedules#update'
  get       '/schedules/orgs/:org_id' => 'schedules#org_schedule'
  post      '/reservations' => 'reservations#create'
  get       '/reservations' => 'reservations#index'
  put       '/reservations/:id' => 'reservations#update'
  delete    '/reservations/:id' => 'reservations#delete'
  get       '/reservations/:id' => 'reservations#show'
  # get     '/users/:id'        => 'users#show'
  # put     '/users/:id'        => 'users#edit'
  # post    '/users/:id/roles'  => 'users#add_role'
  # delete  '/users/:id/roles'  => 'users#remove_role'

end
