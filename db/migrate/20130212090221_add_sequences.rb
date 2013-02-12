class AddSequences < ActiveRecord::Migration
  def change
    create_table :sequences do |t|
      t.references :performance
      t.timestamps
    end
  end
end
