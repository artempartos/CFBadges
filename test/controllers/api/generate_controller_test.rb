require 'test_helper'

class Api::GenerateControllerTest < ActionController::TestCase

  def setup
    filename = Rails.root.join("public", "csv_example.csv")
    csv_text = File.read(filename)
    # csv = CSV.parse(data, :headers => true)
    data = [["id", "company", "name", "family", "nick", "project"], ["1", "Undev", "Artem", "Petrov", "Partos", "CFBadges"], ["2", "Undev", "Mikhail", "Dronov", "mechanic", "CFBadges"]]
    @attrs = {csv_data: data}
    # File.open("ss.csv", "w") {|f| f.write(rows.inject([]) { |csv, row|  csv <<  }.join(""))}
  end

  # test "get show" do
  #   get :show
  #   assert_response :success
  # end

  test "post create" do
    post :create, @attrs
    assert_response :success
  end

end
