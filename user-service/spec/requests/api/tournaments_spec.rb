require 'swagger_helper'

RSpec.describe 'Tournaments API', type: :request do
  before do
  end

  path '/tournaments' do
    post 'Creates New Tournament' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'
      response '201', 'Tournament Created' do
        run_test!
      end
    end
  end

  path '/tournaments/{id}' do
    delete 'Delete Tournament' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '204', 'Tournament Deleted' do
        run_test!
      end
    end
  end
end
# eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE2MDkwMTgxNjB9.gmdns0TvJ7KKF8mFQ6p9L_EeTJLzZwMRnm2-1r6T6yA
