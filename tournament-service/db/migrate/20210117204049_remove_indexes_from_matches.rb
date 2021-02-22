class RemoveIndexesFromMatches < ActiveRecord::Migration[5.0]
  def change
    remove_index :matches, :group_id
    remove_index :matches, %i[group_id player1_id player2_id]
  end
end
