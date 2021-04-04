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

    get 'Index Tournaments' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      response '200', 'Get list of all tournaments' do
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

    get 'Get tournament by id' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'Get Tournament' do
        run_test!
      end
    end
  end

  path '/tournaments/{id}/players' do
    post 'Adds a player to the tournament' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          player_ids: {
            type: :array,
            items: { type: :integer }
          }
        }
      }

      response '201', 'Add players' do
        run_test!
      end
    end

    delete 'Remove Players from the tournament' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          player_ids: {
            type: :array,
            items: { type: :integer }
          }
        }
      }

      response '204', 'Remove Players' do
        run_test!
      end
    end


  end

  path '/tournaments/{id}/groups' do
    post 'Generate groups' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '201', 'Generate groups from register players' do
        run_test!
      end
    end
  end

  path '/tournaments/{id}/playoffs' do
    post 'Generate playoffs' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '201', 'Generate playoffs from register players' do
        run_test!
      end
    end
  end

  path '/match/{id}' do
    put 'Update a match for the group' do
      tags 'Tournaments'
      security [{ bearer_auth: [] }]
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

      response '200', 'Update match' do
        run_test!
      end
    end
  end
end
