
RAILS_ENV=production rails db:migrate
RAILS_ENV=production rails db:seed
bin/rails server -b 0.0.0.0 -e production
