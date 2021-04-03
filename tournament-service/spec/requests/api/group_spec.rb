require 'swagger_helper'

RSpec.describe 'Tournaments API', type: :request do
  before do
  end

  path '/match/{id}' do
    get 'Get a match between 2 players' do
      tags 'Groups'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'Find Match' do
        run_test!
      end
    end

    put 'Create a set for a match' do
      tags 'Groups'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          sets: {
            type: :array,
            items: {
              properties: {
                id: { type: :integer },
                player1_id: { type: :integer },
                player2_id: { type: :integer },
                player1_score: { type: :integer },
                player2_score: { type: :integer }
              }
            }
          }
        }
      }

      response '200', 'Updated Match' do
        run_test!
      end
    end
  end
end
