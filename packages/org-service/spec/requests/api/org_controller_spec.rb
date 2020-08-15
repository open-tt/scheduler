# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Org API', type: :request do
  before do
    @test_org = Org.create!(name: 'Test Org')
    @new_test_org_name = 'New Test Org Name'
  end

  path '/orgs' do
    post 'Creates New Org' do
      tags 'Orgs'

      # operationId 'createUser'
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
            org_name: 'Open Table Tennis'
          }
        end

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
        end
      end
    end

    get 'Search in Orgs' do
      tags 'Orgs'

      consumes 'application/json'
      produces 'application/json'

      parameter name: :org_name, in: :query, type: :string
      parameter name: :owner_name, in: :query, type: :string
      parameter name: :address_1, in: :query, type: :string
      parameter name: :city, in: :query, type: :string
      parameter name: :state, in: :query, type: :string
      parameter name: :zip, in: :query, type: :string

      response '200', 'Search in Orgs' do
        let(:name) { @test_org.name }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
        end
      end
    end
  end

  path '/orgs/{id}' do
    put 'Update an Org' do
      tags 'Orgs'

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

      response '204', 'Org Updated successfully' do
        let(:id) { @test_org.id }
        let(:data) do
          {
            org_name: @new_test_org_name,
            is_verified: true,
            is_enabled: true
          }
        end

        run_test! do |_response|
          @test_org.name = @new_test_org_name
          @test_org.is_enabled = true
          @test_org.is_verified = true
        end
      end
    end
  end

  path '/orgs/{id}/users' do
    get 'List all users in org' do
      tags 'Orgs'

      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'List all the users' do
        before do
          @test_org.orgs_users.create!([{ user_id: 1 }, { user_id: 2 }])
        end
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

      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameters name: :user_id, in: :path, type: :integer

      response '201', 'Linked User to Org' do
        let(:id) { @test_org.id }
        let(:user_id) { 1 }

        run_test! do
          expect(@test_org.orgs_users.first.user_id).to eq(1)
        end
      end
    end

    delete 'Remove user from org' do
      tags 'Orgs'

      consumes 'application/json'
      produces 'application/json'

      response '204', 'Unlinked User from Org' do
        before do
          @test_org.orgs_users.create!(user_id: 1)
        end

        let(:id) { @test_org.id }
        let(:user_id) { 1 }

        run_test! do
          expect(@test_org.orgs_users.count).to eq(0)
        end
      end
    end
  end

  path '/orgs/{id}/addresses' do
    post 'Add address to org' do
      tags 'Orgs'

      consumes 'application/json'
      produces 'application/json'
    end

    get 'List all addresses for org' do
      tags 'Orgs'

      consumes 'application/json'
      produces 'application/json'
    end
  end

  path '/orgs/{id}/addresses/{address_id}' do
    put 'Update address in org' do
      tags 'Orgs'

      consumes 'application/json'
      produces 'application/json'
    end

    delete 'Remove address from org' do
      tags 'Orgs'

      consumes 'application/json'
      produces 'application/json'
    end
  end
end
