require 'test_helper'

class Web::ProcessControllerTest < ActionController::TestCase

  test "get success" do
    get :index
    assert_response :success
  end

end
