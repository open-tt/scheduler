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
  path '/ttprofiles/import' do
    post 'Import batch of tt profiles without users' do
      tags 'TT Profiles'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          batch: {
            type: :array,
            items: {
              type: :object,
              properties: {
                name: { type: :string },
                usattid: { type: :integer },
                location: { type: :string },
                homeclub: { type: :string },
                rating: { type: :integer }
              }
            }
          }
        }
      }

      response '201', 'Imported batch of users' do
        run_test!
      end
    end
  end

  path '/ttprofiles' do
    get 'Get all available profiles' do
      tags 'TT Profiles'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      response '200', 'Get Profiles' do
        run_test!
      end
    end
  end
end
