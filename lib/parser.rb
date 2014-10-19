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

		svg_name = xml.xpath('//*[contains(@style,"svg_nick")]')
		p svg_name
		x = svg_name.attribute('x').to_s.to_f
		y = svg_name.attribute('y').to_s.to_f
		height = svg_name.attribute('height').to_s.to_f
		text = "<text x='#{x.to_s}' y='#{(y + height).to_s}' font-family='Verdana' font-size='#{(0.75 * height).to_i.to_s}' fill='blue' > Mechanic </text>"
		p text

		xml.xpath('//*[contains(@style,"svg_nick")]').each do |element|
			element.replace(text)
		end
		p "after removing"
		svg_name = xml.xpath('//*[contains(@style,"svg_nick")]')
		p svg_name
		p xml



		File.open(Rails.root.join("public", "321.svg"), 'w') { |f| f.print(xml.to_xml) }
	end

end
