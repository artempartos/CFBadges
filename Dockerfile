FROM binaryphile/ruby:2.0.0-p247
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev build-essential libpq-dev libxml2 zlib1g-dev libncurses5-dev libncurses5 libxslt-dev libxml2-dev
RUN mkdir /badges
WORKDIR /badges
ADD Gemfile /badges/Gemfile
RUN bundle install --path vendor/bundle
ADD . /badges
