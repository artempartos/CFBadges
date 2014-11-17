class CreateOrderItems < ActiveRecord::Migration
  def change
    create_table :order_items do |t|

      t.text :params
      t.string :state
      t.references :order

      t.timestamps
    end
  end
end
