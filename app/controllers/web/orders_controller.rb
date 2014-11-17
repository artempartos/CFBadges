class Web::OrdersController < Web::ApplicationController

	def new
		@order = Order.new
	end

	def create
		order = Order.create(order_params)
		redirect_to order_path(order)
	end

	def show
		@order = Order.find params[:id]
		gon.order = @order
		gon.file = @order.image.url
	end

	private

	def order_params
		params.require(:order).permit(:image)
	end

end
