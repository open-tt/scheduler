class AddIndexOnGroupPlayer1Player2ToMatches < ActiveRecord::Migration[5.0]
  def change
    add_index :matches, %i[group_id player1_id player2_id], unique: true
  end
end
