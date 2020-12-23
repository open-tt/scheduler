# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Schedules API', type: :request do
  before do
    @schedule_create_params = {
      user_id: 1,
      org_id: 1,
      hours: {
        monday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        tuesday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        wednesday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        thursday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        friday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        saturday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        sunday: {
          start: '0800',
          end: '2000',
          enabled: true
        }
      },
      availability_per_interval: 25,
      price_in_cents: 1000
    }
    @schedule_update_params = {
      availability_per_interval: 1,
      price_in_cents: 1
    }
    @schedule1 = Schedule.create!(
      user_id: 1,
      org_id: 1,
      hours: {
        monday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        tuesday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        wednesday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        thursday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        friday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        saturday: {
          start: '0800',
          end: '2000',
          enabled: true
        },
        sunday: {
          start: '0800',
          end: '2000',
          enabled: true
        }
      },
      availability_per_interval: 9,
      price_in_cents: 999
    )
  end

  path '/schedules' do
    post 'Creates New Schedule for an ORG' do
      tags 'Schedule'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          user_id: { type: :integer },
          org_id: { type: :integer },
          hours: {
            type: :object,
            properties: {
              monday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              tuesday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              wednesday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              thursday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              friday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              saturday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              sunday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              }
            }
          },
          availability_per_interval: { type: :integer },
          price_in_cents: { type: :integer }
        },
        required: %w[user_id org_id hours availability_per_interval price_in_cents]
      }

      response '201', 'Schedule created successfully' do
        let(:data) { @schedule_create_params }

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['schedule']['id'].class).to eq(Integer)
          expect(data['schedule']['hours']).to_not be_nil
        end
      end
    end
  end

  path '/schedules/orgs/{org_id}' do
    get 'Get the schedule for the given org' do
      tags 'Schedule'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :org_id, in: :path, type: :integer

      response '200', 'Get schedule for org' do
        let(:org_id) { @schedule1.org_id }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(data['schedule']['id']).to eq(@schedule1.id)
        end
      end

      response '404', 'Fail get schedule for non existing org id' do
        let(:org_id) { 99999 }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['success']).to eq(false)
        end
      end
    end
  end

  path '/schedules/{id}' do
    put 'Update Schedule' do
      tags 'Schedule'

      consumes 'application/json'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :id, in: :path, type: :integer
      parameter name: :data, in: :body, schema: {
        type: :object,
        properties: {
          hours: {
            type: :object,
            properties: {
              monday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              tuesday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              wednesday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              thursday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              friday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              saturday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              },
              sunday: {
                type: :object,
                properties: {
                  start: { type: :string, example: '0800' },
                  end: { type: :string, example: '2000' },
                  enabled: { type: :boolean, default: true }
                }
              }
            }
          },
          availability_per_interval: { type: :integer },
          price_in_cents: { type: :integer }
        },
        required: %w[hours availability_per_interval price_in_cents]
      }

      response '200', 'Schedule updated successfully' do
        let(:id) { @schedule1.id }
        let(:data) { @schedule_update_params }

        run_test! do |response|
          @schedule1.reload
          data = JSON.parse(response.body)
          expect(data['success']).to eq(true)
          expect(@schedule1.availability_per_interval).to eq(@schedule_update_params[:availability_per_interval])
          expect(@schedule1.price_in_cents).to eq(@schedule_update_params[:price_in_cents])
        end
      end
    end
  end
end
