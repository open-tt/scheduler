class CreateMatches < ActiveRecord::Migration[5.0]
  def change
    create_table :matches do |t|
      t.integer :best_of
      t.integer :player1_id
      t.integer :player2_id

      t.timestamps
    end
  end
end
