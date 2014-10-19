Configus.build Rails.env do

	env :production do
		filepicker_api_key -> { "AHTdvfi0ISgeiLtYvjaW2z" }

		workers do
			retry_count 5
		end

	end

  env :staging, parent: :production do
	end

	env :development, parent: :production do
		filepicker_api_key -> { ENV['FILEPICKER_API_KEY'] }
	end

	env :test do
		filepicker_api_key -> { "test_api_key" }
	end
end
