require 'test_helper'

class Web::OrdersControllerTest < ActionController::TestCase

  test "get new success" do
    get :new
    assert_response :success
  end

end
