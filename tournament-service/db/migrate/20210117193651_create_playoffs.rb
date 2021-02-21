class CreatePlayoffs < ActiveRecord::Migration[5.0]
  def change
    create_table :playoffs do |t|
      t.references :tournament, foreign_key: true
      t.integer :first_places
      t.integer :second_places
      t.integer :extra_players

      t.timestamps
    end
  end
end
