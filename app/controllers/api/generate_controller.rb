require 'csv'

class Api::GenerateController < Api::ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = params["csv_data"]
    svg = params["svg"]

    csv_data = data.map { |arr| CSV.generate_line(arr) }.join("")
    csv = CSV.parse(csv_data, :headers => true)

    csv.each do |row|
      attrs = {
        # TODO save id, not object
        svg: svg,
        options: row.to_hash
      }
      Workers::Badger.defer(attrs)
    end

    render json: { preview_url: "preview йопта" }
  end

end
