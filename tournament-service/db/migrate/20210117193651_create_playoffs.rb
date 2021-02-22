class CreatePlayoffs < ActiveRecord::Migration[5.0]
  def change
    create_table :playoffs do |t|
      t.references :tournament, foreign_key: true
      t.integer :first_places, array: true
      t.integer :second_places, array: true
      t.integer :extra_players, array: true

      t.timestamps
    end
  end
end
