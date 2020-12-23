# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Reservations', type: :request do
  before do
    @reservation_create_params = {
      location_id: 2,
      user_id: 2,
      coach_id: 2,
      start_timestamp: 1_598_823_644,
      duration_in_minutes: 222,
      size: 1,
      kind: Reservation.play
    }
    @reservation_update_params = {
      start_timestamp: 999,
      duration_in_minutes: 120,
      size: 3
    }
    @reservation1 = Reservation.create!(
      location_id: 1,
      user_id: 1,
      coach_id: 1,
      start_timestamp: 1_598_823_644,
      duration_in_minutes: 60,
      size: 1,
      kind: Reservation.kinds[:play]
    )
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
          location_id: { type: :integer },
          user_id: { type: :integer },
          coach_id: { type: :integer },
          start_timestamp: { type: :integer, description: 'UNIX EPOCH date time' },
          duration_in_minutes: { type: :integer },
          size: { type: :integer },
          kind: { type: :string, enum: Reservation.kinds }
        }
      }

      response '201', 'Reservation created successfully' do
        let(:data) { @reservation_create_params }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['reservation']['id'].class).to eq(Integer)
        end
      end
    end

    get 'Get list of reservations with Filters' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :location_id, in: :query, type: :integer
      parameter name: :user_id, in: :query, type: :integer
      parameter name: :start_timestamp, in: :query, type: :integer

      response '200', 'Get list of reservations' do
        let(:location_id) { @reservation1.location_id }
        let(:user_id) { @reservation1.location_id }
        let(:start_timestamp) { @reservation1.start_timestamp }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['reservations'][0]['id']).to eq(@reservation1.id)
        end
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
          start_timestamp: { type: :integer, description: 'UNIX EPOCH date time' },
          duration_in_minutes: { type: :integer },
          size: { type: :integer }
        }
      }

      response '200', 'Reservation updated successfully' do
        let(:id) { @reservation1.id }
        let(:data) { @reservation_update_params }

        run_test! do |response|
          @reservation1.reload
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(@reservation1.start_timestamp).to eq(@reservation_update_params[:start_timestamp])
          expect(@reservation1.duration_in_minutes).to eq(@reservation_update_params[:duration_in_minutes])
          expect(@reservation1.size).to eq(@reservation_update_params[:size])
        end
      end

      response '404', 'Reservation update failure with invalid id' do
        let(:id) { 99_999 }
        let(:data) { @reservation_update_params }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(false)
        end
      end
    end

    delete 'Delete a Reservation' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '204', 'Reservation deleted successfully' do
        let(:id) { @reservation1.id }
        run_test! do
          @reservation1.reload
          fail # force failure since @reservation1 should not exist any more
        rescue ActiveRecord::RecordNotFound
          # Expecting this error as success case
        end
      end
    end

    get 'Get a reservation by its ID' do
      tags 'Reservations'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer

      response '200', 'Reservation retrieved successfully' do
        let(:id) { @reservation1.id }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['reservation']['id']).to eq(@reservation1.id)
        end
      end
    end
  end
end
