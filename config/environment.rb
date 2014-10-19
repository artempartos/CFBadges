# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

module Badge
	class Application < Rails::Application
		config.autoload_paths += %W(#{config.root}/lib)
		config.filepicker_rails.api_key = configus.filepicker_api_key
	end
end
