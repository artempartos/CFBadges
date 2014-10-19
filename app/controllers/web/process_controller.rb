class Web::ProcessController < Web::ApplicationController

  def index
    gon.file = session[:file_url] if session[:file_url]
  end

end
