require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module OpenttScheduler
  class Application < Rails::Application
    # Custom
    config.tournament = {
      group: {
        min: 3,
        max: 4
      }
    }
    # Default
    config.api_only = true
    config.eager_load_paths << Rails.root.join('lib')
    config.active_record.time_zone_aware_types = [:datetime, :time]
  end
end
