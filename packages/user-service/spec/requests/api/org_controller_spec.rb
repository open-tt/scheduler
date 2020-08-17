# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Org API', type: :request do
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
    @second_user = User.create!(
      {
        name: 'test',
        email: 'test@test.com',
        is_enabled: true,
        password: '123123',
        password_confirmation: '123123'
      }
    )
    @admin_user.roles_users.create!(role_id: Role.admin.id, org_id: 1)
    @new_test_org_name = 'New Test Org Name'
    @test_org = Org.create!(name: @new_test_org_name)
    @test_org.users = [@admin_user, @second_user]
  end
  let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: @admin_user.id)}" }

  path '/orgs' do
    post 'Creates New Org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          user_id: { type: :integer },
          org_name: { type: :string }
        },
        required: %w[user_id org_name]
      }

      response '201', 'Org created successfully' do
        let(:data) do
          {
            user_id: 1,
            org_name: @new_test_org_name
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['org']['name']).to eq(@new_test_org_name)
        end
      end
    end

    get 'Search in Orgs' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :org_name, in: :query, type: :string, required: false
      parameter name: :owner_id, in: :query, type: :string, required: false
      parameter name: :addr_1, in: :query, type: :string, required: false
      parameter name: :city, in: :query, type: :string, required: false
      parameter name: :state, in: :query, type: :string, required: false
      parameter name: :zip, in: :query, type: :string, required: false

      response '200', 'Search in Orgs' do
        let(:org_name) { @test_org.name }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['orgs'].count).to eq(1)
        end
      end
    end
  end

  path '/orgs/{id}' do
    put 'Update an Org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          org_name: { type: :string },
          is_enabled: { type: :boolean },
          is_verified: { type: :boolean }
        }
      }

      response '204', 'Org Updated' do
        let(:id) { @test_org.id }
        let(:data) do
          {
            org_name: @new_test_org_name,
            is_verified: true,
            is_enabled: true
          }
        end

        run_test! do
          @test_org.name = @new_test_org_name
          @test_org.is_enabled = true
          @test_org.is_verified = true
        end
      end
    end
  end

  # TODO: Adrian todo
  path '/orgs/{id}/users' do
    get 'List all users in org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'List all the users' do
        let(:id) { @test_org.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data).to have_key('users')
          expect(data['users'].count).to eq(2)
        end
      end
    end
  end

  path '/orgs/{id}/users/{user_id}' do
    post 'Add User to Org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :user_id, in: :path, type: :integer

      response '201', 'Linked User to Org' do
        let(:id) { @test_org.id }
        let(:user_id) { 1 }

        run_test! do
          expect(@test_org.users.first.id).to eq(1)
        end
      end
    end

    delete 'Remove user from org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :user_id, in: :path, type: :integer

      response '204', 'Unlinked User from Org' do
        before do
          @org1 = Org.create!(name: 'Org 1')
          @org1.users.push(@second_user)
        end

        let(:id) { @org1.id }
        let(:user_id) { @second_user.id }

        run_test! do
          expect(@org1.users.count).to eq(0)
        end
      end
    end
  end

  path '/orgs/{id}/addresses' do
    post 'Add address to org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :address, in: :body, schema: {
        type: :object,
        properties: {
          addr_1: { type: :string },
          addr_2: { type: :string },
          city: { type: :string },
          state: { type: :string },
          zip: { type: :string }
        },
        required: %w[addr_1 city state zip]
      }

      response '201', 'Create Location for Org' do
        let(:id) { @test_org.id }
        let(:address) do
          {
            addr_1: '123 Lane 4th st',
            city: 'Bellevue',
            state: 'WA',
            zip: '99999'
          }
        end

        run_test! do
          expect(@test_org.addresses.count).to eq(1)
          expect(@test_org.addresses.first.zip).to eq('99999')
        end
      end
    end

    get 'List all addresses for org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'List all locations' do
        before do
          @test_org.addresses.create!({
                                        addr_1: '123 Lane 4th st',
                                        city: 'Bellevue',
                                        state: 'WA',
                                        zip: '99999'
                                      })
        end

        let(:id) { @test_org.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['addresses'].count).to eq(1)
        end
      end
    end
  end

  path '/orgs/{id}/addresses/{address_id}' do
    put 'Update address in org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :address_id, in: :path, type: :integer
      parameter name: :address_update, in: :body, schema: {
        type: :object,
        properties: {
          addr_1: '123 Lane 4th st',
          city: 'Bellevue',
          state: 'WA',
          zip: '99999'
        }
      }

      response '204', 'Updated Address' do
        before do
          @test_address = @test_org.addresses.create!({
                                                        addr_1: '123 Lane 4th st',
                                                        city: 'Bellevue',
                                                        state: 'WA',
                                                        zip: '99999'
                                                      })
        end

        let(:id) { @test_org.id }
        let(:address_id) { @test_address.id }
        let(:address_update) { { zip: '00000' }}

        run_test! do
          expect(@test_address.zip).to be('00000')
        end
      end
    end

    delete 'Remove address from org' do
      tags 'Orgs'

      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :address_id, in: :path, type: :integer

      response '204', 'Delete address' do
        before do
          @test_address = @test_org.locations.create!({
                                                        addr_1: '123 Lane 4th st',
                                                        city: 'Bellevue',
                                                        state: 'WA',
                                                        zip: '99999'
                                                      })
        end

        let(:id) { @test_org.id }
        let(:address_id) { @test_address.id }

        run_test! do
          expect(@test_org.addresses.count).to be(0)
        end
      end
    end
  end
end
