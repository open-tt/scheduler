class CreateMatchSets < ActiveRecord::Migration[5.0]
  def change
    create_table :match_sets do |t|
      t.integer :player1_id
      t.integer :player1_score
      t.integer :player2_id
      t.integer :player2_score

      t.timestamps
    end
  end
end
