ENV['RAILS_ENV'] ||= 'test'

require File.expand_path('../../config/environment', __FILE__)
require 'wrong'
require 'rails/test_help'

Dir[File.expand_path('../support/**/*.rb', __FILE__)].sort.each { |f| require f}

require 'wrong/adapters/minitest'
require "minitest/pride"

Wrong.config.color

FactoryGirl.reload
FactoryGirlSequences.reload
Wrong.config.color

class ActiveSupport::TestCase
  include Wrong
  ActiveRecord::Migration.maintain_test_schema!
  include FactoryGirl::Syntax::Methods
end
