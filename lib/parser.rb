class Parser
	require 'nokogiri'
	require 'open-uri'

	def read_csv
		filename = Rails.root.join("public", "csv_example.csv")
		file = File.new(filename, 'r')

		file.each_line("\n") do |row|
			columns = row.split(",")
			p columns
		end
	end

	def read_xml
		file = File.read(Rails.root.join("public", "123.svg"))
		xml = Nokogiri::XML file

		atr = xml.css('//g[contains(@style,"name")]').first
		p atr
	end

end
