class RemoveOldPlayoffsFromTournaments < ActiveRecord::Migration[5.0]
  def change
    remove_column :tournaments, :playoffs
  end
end
