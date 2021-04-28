# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Reservations', type: :request do
  before do
    @reservation_create_params = {
      host: 2,
      recipient: 2,
      start_timestamp: 1_598_823_644,
      kind: Reservation.play,
      note: 'Hello'
    }
    @reservation_update_params = {
      start_timestamp: 999,
    }
    # @reservation1 = Reservation.create!(
    #   location_id: 1,
    #   user_id: 1,
    #   coach_id: 1,
    #   start_timestamp: 1_598_823_644,
    #   duration_in_minutes: 60,
    #   size: 1,
    #   kind: Reservation.kinds[:play]
    # )
  end

  path '/reservations' do
    post 'Creates New Reservation' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          host: { type: :integer },
          recipient: { type: :integer },
          event_date: { type: :string },
          start_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
          end_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
          kind: { type: :string, enum: Reservation.kinds },
          recipient_rsvp: { type: :string, enum: Reservation.recipient_rsvps },
          note: { type: :string }
        }
      }

      response '201', 'Reservation created successfully' do
        # let(:data) { @reservation_create_params }
        #
        # run_test! do |response|
        #   data = JSON.parse(response.body)
        #   expect(data['success']).to eq(true)
        #   expect(data['reservation']['id'].class).to eq(Integer)
        # end
        run_test!
      end
    end

    get 'Get list of reservations with Filters' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :host, in: :query, type: :integer
      parameter name: :recipient, in: :query, type: :integer
      parameter name: :recipient_rsvp, in: :query, type: :string, enum: Reservation.recipient_rsvps
      parameter name: :start_timestamp, in: :query, type: :integer

      response '200', 'Get list of reservations' do
        # let(:location_id) { @reservation1.location_id }
        # let(:user_id) { @reservation1.location_id }
        # let(:start_timestamp) { @reservation1.start_timestamp }
        #
        # run_test! do |response|
        #   data = JSON.parse(response.body)
        #   expect(data['success']).to eq(true)
        #   expect(data['reservations'][0]['id']).to eq(@reservation1.id)
        # end
        run_test!
      end
    end
  end

  path '/reservations/{id}' do
    put 'Update Reservation' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          event_date: { type: :string },
          start_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
          end_time: { type: :string, description: '24 h time. Ex 16:35 to represent 4:35pm' },
          kind: { type: :string, enum: Reservation.kinds },
          recipient_rsvp: { type: :string, enum: Reservation.recipient_rsvps },
          note: { type: :string }
        }
      }

      response '200', 'Reservation updated successfully' do
        # let(:id) { @reservation1.id }
        # let(:data) { @reservation_update_params }
        #
        # run_test! do |response|
        #   @reservation1.reload
        #   data = JSON.parse(response.body)
        #   expect(data['success']).to eq(true)
        #   expect(@reservation1.start_timestamp).to eq(@reservation_update_params[:start_timestamp])
        #   expect(@reservation1.duration_in_minutes).to eq(@reservation_update_params[:duration_in_minutes])
        #   expect(@reservation1.size).to eq(@reservation_update_params[:size])
        # end
        run_test!
      end

      response '404', 'Reservation update failure with invalid id' do
        # let(:id) { 99_999 }
        # let(:data) { @reservation_update_params }
        # run_test! do |response|
        #   data = JSON.parse(response.body)
        #   expect(data['success']).to eq(false)
        # end
        run_test!
      end
    end

    delete 'Delete a Reservation' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '204', 'Reservation deleted successfully' do
        # let(:id) { @reservation1.id }
        # run_test! do
        #   @reservation1.reload
        #   fail # force failure since @reservation1 should not exist any more
        # rescue ActiveRecord::RecordNotFound
        #   # Expecting this error as success case
        # end
        run_test!
      end
    end

    get 'Get a reservation by its ID' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'Reservation retrieved successfully' do
        # let(:id) { @reservation1.id }
        #
        # run_test! do |response|
        #   data = JSON.parse(response.body)
        #   expect(data['success']).to eq(true)
        #   expect(data['reservation']['id']).to eq(@reservation1.id)
        # end
        run_test!
      end
    end
  end
end
