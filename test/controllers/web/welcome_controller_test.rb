require 'test_helper'

class Web::WelcomeControllerTest < ActionController::TestCase

  test "get success" do
    get :index
    assert_response :success
  end
  
end
