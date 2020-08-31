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
  end
end
