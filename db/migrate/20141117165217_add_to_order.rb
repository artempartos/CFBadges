class AddToOrder < ActiveRecord::Migration
  def change
    change_table :orders do |t|
      t.text :svg_data
      t.string :state
    end
  end
end
