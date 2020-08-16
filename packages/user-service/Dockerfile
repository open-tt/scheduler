FROM ruby:2.5.1

RUN apt-get update -qq && apt-get install -y build-essential

# for postgres
RUN apt-get install -y libpq-dev

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

ENV SECRET_KEY_BASE ec2af6c0f6860e9d0d3947cbffcc439789b2b6e5b8f2ac355dec3629a96bf6570d86bc5093ede562e7efc4eaa5eacfcf007cf3dd5feb6129e298de73c6e12a71
ENV APP_HOME /myapp
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME

EXPOSE 3000
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-e", "production"]
