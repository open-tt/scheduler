require 'swagger_helper'

RSpec.describe 'Tournaments API', type: :request do
  before do
  end

  # path '/groups' do
  # end
  #
  # path '/groups/{id}' do
  # end

  path '/groups/{id}/match' do
    get 'Get a match between 2 players' do
      tags 'Groups'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :player1, in: :query, type: :integer
      parameter name: :player2, in: :query, type: :integer
      parameter name: :should_create, in: :query, type: :boolean, default: false

      response '200', 'Find Match' do
        run_test!
      end
    end

    put 'Create a set for a match' do
      tags 'Groups'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :player1, in: :query, type: :integer
      parameter name: :player1_score, in: :query, type: :integer
      parameter name: :player2, in: :query, type: :integer
      parameter name: :player2_score, in: :query, type: :integer

      response '201', 'Created Set' do
        run_test!
      end
    end
  end
end
