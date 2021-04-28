require 'swagger_helper'

RSpec.describe 'Reservations API', type: :request do
  path '/reservations' do
    post 'Create Reservation' do
      tags 'Reservations'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          recipient: { type: :integer },
          start_timestamp: { type: :integer, description: 'UNIX EPOCH date time' },
          end_timestamp: { type: :integer, description: 'UNIX EPOCH date time' },
          kind: { type: :string },
          recipient_rsvp: { type: :string },
          note: { type: :string }
        }
      }

      response '201', 'Tournament Created' do
        run_test!
      end
    end

    get 'Search Reservations' do
      tags 'Reservations'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :host, in: :query, type: :integer
      parameter name: :recipient, in: :query, type: :integer
      parameter name: :recipient_rsvp, in: :query, type: :string
      parameter name: :start_timestamp, in: :query, type: :integer
      response '200', 'Search' do
        run_test!
      end
    end
  end

  path '/reservations/{id}' do
    put 'Update Reservation' do
      tags 'Reservations'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          start_timestamp: { type: :integer, description: 'UNIX EPOCH date time' },
          end_timestamp: { type: :integer, description: 'UNIX EPOCH date time' },
          kind: { type: :string },
          recipient_rsvp: { type: :string },
          note: { type: :string }
        }
      }

      response '200', 'Update Reservation' do
        run_test!
      end
    end

    get 'Get Reservation with ID' do
      tags 'Reservations'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'Get Reservation' do
        run_test!
      end
    end

    delete 'Delete Reservation' do
      tags 'Reservations'
      security [{ bearer_auth: [] }]
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '204', 'Delete Reservation' do
        run_test!
      end
    end
  end
end
