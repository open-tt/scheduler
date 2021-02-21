class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.string :name, required: true
      t.integer :tournament_rating, default: 0
      t.integer :league_rating, default: 0
      t.string :usattid
      t.string :location
      t.string :homeclub

      t.timestamps
    end
  end
end
