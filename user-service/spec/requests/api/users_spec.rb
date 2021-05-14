# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Users API', type: :request do
  before do
    Rails.application.load_seed
    @admin_user = User.create!(
      {
        name: 'overseer',
        email: 'over@test.com',
        is_enabled: true,
        password: '123123',
        password_confirmation: '123123'
      }
    )
    @admin_user.roles_users.create!(role_id: Role.admin.id, org_id: 1)
  end

  path '/players' do
    get 'Get all player profiles' do
      tags 'Users'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      response '200', 'Get all users with tt profiles' do
        run_test!
      end
    end
  end

  path '/users' do
    post 'Creates New User' do
      tags 'Users'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          email: { type: :string },
          password: { type: :string },
          password_confirmation: { type: :string },
          is_enabled: { type: :boolean }
        },
        required: %w[name email password password_confirmation]
      }

      response '201', 'User created successfully' do
        schema '$ref' => '#/components/schemas/registration_success'

        let(:user) do
          {
            name: 'jon doe',
            email: 'jd@testmail.com',
            password: 'jdpass',
            password_confirmation: 'jdpass'
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
        end
      end

      response '409', 'User creation failed with invalid email' do
        schema '$ref' => '#/components/schemas/registration_failure'
        let(:user) do
          {
            name: 'jon doe',
            email: 'not-an-email',
            password: 'jdpass',
            password_confirmation: 'jdpass'
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(false)
          expect(data['messages']).to include('Email is invalid')
        end
      end
    end

    get 'Search Users' do
      tags 'Users'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :name, in: :query, type: :string
      parameter name: :city, in: :query, type: :string
      parameter name: :club, in: :query, type: :string

      response '200', 'Search' do
        run_test!
      end
    end
  end

  path '/users/partial' do
    post 'Creates New User without username and password requirements' do
      tags 'Users'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          rating: { type: :integer },
          usattid: { type: :string }
        },
        required: %w[name rating usattid]
      }

      response '201', 'Partial User created successfully' do
        schema '$ref' => '#/components/schemas/partial_user_for_tournament'
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin_user.id)}" }
        let(:user) do
          {
            name: 'jon doe',
            rating: 2199,
            usattid: 'ID71947161'
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['name']).to eq('jon doe')
          expect(data['rating']).to eq(2199)
          expect(data['usattid']).to eq('ID71947161')
        end
      end
    end
  end

  path '/current_user' do
    get 'Get the user belonging to the Authorization token' do
      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      response '200', 'User retrieved' do
        run_test!
      end
    end
  end

  path '/users/{id}' do
    get 'Get User by ID' do
      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'User profile retrieved successfully' do
        let(:user) do
          user = User.create!(
            {
              name: 'jon doe',
              email: 'jd@testmail.com',
              password: 'jdpass',
              password_confirmation: 'jdpass'
            }
          )
          user.roles = [Role.player]
          user
        end

        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: user.id)}" }
        let(:id) { user.id }
        run_test! do
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data).to have_key('user')
          expect(data['user']).to have_key('name')
        end
      end
    end

    put 'Edits existing User' do
      before do
        @user = User.create!(
          { name: 'jon doe', email: 'jd@testmail.com', password: 'jdpass', password_confirmation: 'jdpass' }
        )
        @user.roles = [Role.player]
      end

      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :user_update, in: :body, schema: {
        type: :object,
        properties: {
          is_enabled: { type: :boolean },
          profile_image: { type: :string },
          name: { type: :string },
          phone: { type: :string },
          address: { type: :email }
        }
      }

      response '204', 'Update User fields successfully' do
        let(:user_update) do
          {
            name: 'updated jon'
          }
        end
        let(:id) { @user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user.id)}" }

        run_test!
      end

      response '404', 'Update User fails with non-existent user id' do
        let(:user_update) { { name: 'updated jon' } }
        let(:id) { 999 }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user.id)}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(false)
          expect(data['message']).to eq('User does not exist')
        end
      end

      response '422', 'Update User fails edit on empty name' do
        let(:user_update) { { name: '' } }
        let(:id) { @user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user.id)}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(false)
          expect(data['messages']).to include("Name can't be blank")
        end
      end

      response '422', 'Update User fails edit when no params passed' do
        let(:user_update) { {} }
        let(:id) { @user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @user.id)}" }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(false)
          expect(data['message']).to eq('No fields to update')
        end
      end
    end
  end

  path '/users/{id}/tt_profile' do
    put 'Edit TT Profile' do
      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :user_update, in: :body, schema: {
        type: :object,
        properties: {
          blade: { type: :string },
          forehand: { type: :string },
          backhand: { type: :string },
          hand: { type: :string },
          grip: { type: :string },
          partner_min_rating: { type: :integer },
          partner_max_rating: { type: :integer }
        }
      }

      response '200', 'Update tt_profile' do
        run_test!
      end
    end
  end

  path '/users/{id}/tournament_data' do
    get 'Get User by ID' do
      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'Get user data for tournament' do
        let(:user) do
          user = User.create!(
            {
              name: 'jon doe',
              email: 'jd@testmail.com',
              password: 'jdpass',
              password_confirmation: 'jdpass',
              rating: 2199,
              usattid: 'D23423532'
            }
          )
          user.roles = [Role.player]
          user
        end

        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin_user.id)}" }
        let(:id) { user.id }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['name']).to eq('jon doe')
          expect(data['rating']).to eq(2199)
          expect(data['usattid']).to eq('D23423532')
        end
      end
    end
  end

  path '/users/{id}/roles' do
    post 'Add Role' do
      before do
        @user = User.create!(
          { name: 'jon doe', email: 'jd@testmail.com', password: 'jdpass', password_confirmation: 'jdpass' }
        )
      end

      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :role, in: :query, type: :string, enum: Role.default_roles, required: true
      parameter name: :org_id, in: :query, type: :integer, required: true

      response '204', 'Add Role' do
        let(:role) { Role.player.name }
        let(:org_id) { 1 }
        let(:id) { @user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin_user.id)}" }

        run_test! do
          expect(@user.roles.pluck(:name)).to include(role)
        end
      end
    end

    delete 'Remove a Role' do
      before do
        @user = User.create!(
          { name: 'jon doe', email: 'jd@testmail.com', password: 'jdpass', password_confirmation: 'jdpass' }
        )
        @role = Role.player
        RolesUsers.create!(user_id: @user.id, role_id: @role.id, org_id: 1)
        puts 1
      end

      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :role, in: :query, type: :string, enum: Role.default_roles, required: true
      parameter name: :org_id, in: :query, type: :integer, required: true

      response '204', 'Remove a Role' do
        let(:role) { @role.name }
        let(:org_id) { 1 }
        let(:id) { @user.id }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin_user.id)}" }

        run_test! do
          expect(@user.roles.pluck(:name)).to_not include(@role.name)
        end
      end
    end
  end

  path '/users/{id}/password' do
    patch 'Change Password' do
      tags 'Users'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :password_update, in: :body, schema: {
        type: :object,
        properties: {
          password: { type: :string },
          newPassword: { type: :string },
          passwordConfirmation: { type: :string }
        }
      }

      response '204', 'Password changed successfully' do
        run_test!
      end
    end
  end

end
