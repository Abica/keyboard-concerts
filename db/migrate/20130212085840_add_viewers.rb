class AddViewers < ActiveRecord::Migration
  def change
    create_table :viewers do |t|
      t.references :performance
      t.integer :rating
      t.timestamps
    end
  end
end
