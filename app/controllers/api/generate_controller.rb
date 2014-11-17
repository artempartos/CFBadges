require 'csv'

class Api::GenerateController < Api::ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    data = params[:csv_data]
    p data
    p params["csv_data"]
    # p params

    order = Order.find params["id"]
    order.update_attributes(order_params)

    csv_data = data.map { |arr| CSV.generate_line(arr) }.join("")
    csv = CSV.parse(csv_data, :headers => true)

    csv.each do |row|
      order.items.create(params: row.to_h)
    end

    render json: { status: "ok" }
  end

  def order_params
    params.require(:order).permit(:svg_data)
  end

end
