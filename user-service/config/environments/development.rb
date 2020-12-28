Rails.application.configure do
  # API Configs
  config.tournament_service_host = 'http://localhost:3002'

  # Default Configs
  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local = true
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=172800'
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.perform_caching = false
  config.action_mailer.delivery_method = :test
  config.action_mailer.smtp_settings = {
    :address              => "smtp.sendgrid.net",
    :port                 => 465,
    :user_name            => "apikey",
    :password             => ENV['SMTP_SERVER_PASSWORD'],
    :authentication       => "plain",
    :enable_starttls_auto => true
  }
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker
end
