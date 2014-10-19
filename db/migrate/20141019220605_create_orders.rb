class CreateOrders < ActiveRecord::Migration
  def change
    create_table :order do |t|
			t.integer :csv_count
			t.integer :csv_actual_count
      t.string :archive_url
      t.timestamps
    end
  end
end
