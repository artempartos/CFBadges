require 'nokogiri'

class Parser

	def self.make_svg(sample_svg, params)
		xml = Nokogiri::XML sample_svg

		svgs = xml.xpath('//*[contains(@style,"svg_")]').map do |svg|
			x = svg.attribute('x').to_s.to_f
			y = svg.attribute('y').to_s.to_f
			attribute = svg.attribute('style').value.split('svg_').last.chop
			attribute_value = params[attribute]
			height = svg.attribute('height').to_s.to_f
			text = "<text x='#{x.to_s}' y='#{(y + height).to_s}' font-family='Verdana' font-size='#{(0.75 * height).to_i.to_s}' fill='black' > #{attribute_value} </text>"
		end

		xml.xpath('//*[contains(@style,"svg_")]').each_with_index do |element, index|
			element.replace(svgs[index])
		end

		uniq = Random.rand.to_s.split('.').last

		File.open(Rails.root.join("public", "name_#{uniq}.svg"), 'w') do |f|
			f.print(xml.to_xml)
		end

	end

	# def read_xml

		# p text

		# xml.xpath('//*[contains(@style,"svg_nick")]').each do |element|
			# element.replace(text)
		# end
		# p "after removing"
		# svg = xml.xpath('//*[contains(@style,"svg_nick")]')
		# p svg_name
		# p xml

		# File.open(Rails.root.join("public", "321.svg"), 'w') { |f| f.print(xml.to_xml) }
	# end

end
