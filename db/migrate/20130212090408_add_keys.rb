class AddKeys < ActiveRecord::Migration
  def change
    create_table :keys do |t|
      t.integer :key
      t.references :sequence

      t.timestamps
    end
  end
end
