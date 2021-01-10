class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.integer :players, array: true

      t.timestamps
    end
  end
end
