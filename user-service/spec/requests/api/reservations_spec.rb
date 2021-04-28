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
          event_date: { type: :string },
          start_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
          end_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
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
          event_date: { type: :string },
          start_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
          end_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
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
