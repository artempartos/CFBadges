class Web::LoadController < Web::ApplicationController

	def new
		@attachment = Attachment.new
	end

	def create
		Attachment.create(attachment_params)
		session[:file_url] = attachment_params
		redirect_to load_index_path
	end

  def index
		@attachment = Attachment.new
  end

	private

	def attachment_params
		params.require(:attachment).permit(:file_url)
	end

end
