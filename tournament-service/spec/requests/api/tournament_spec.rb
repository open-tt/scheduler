require 'swagger_helper'

RSpec.describe 'Tournaments API', type: :request do
  before do
  end

  path '/tournaments' do
    post 'Creates New Tournament' do
      tags 'Tournaments'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          user_id: { type: :integer },
          org_id: { type: :integer }
        },
        required: %w[user_id]
      }

      response '201', 'Tournament Created' do
        run_test!
      end
    end
  end
end
