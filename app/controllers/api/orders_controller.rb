class Api::OrdersController < Api::ApplicationController
  skip_before_action :verify_authenticity_token

	def get_archive_url
		Order.find(session[:order_id]).url
	end

end
