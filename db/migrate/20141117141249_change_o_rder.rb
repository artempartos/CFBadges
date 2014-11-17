class ChangeORder < ActiveRecord::Migration
  def change
    change_table :orders do |t|
      t.remove :csv_count
      t.remove :csv_actual_count
      t.string :image
    end
  end
end
