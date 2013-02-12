class AddPerformances < ActiveRecord::Migration
  def change
    create_table :performances do |t|
      t.string :uuid, :null => false
      t.timestamps
    end
  end
end
