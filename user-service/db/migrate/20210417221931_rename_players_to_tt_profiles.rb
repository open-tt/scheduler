class RenamePlayersToTtProfiles < ActiveRecord::Migration[5.0]
  def change
    remove_columns :players, :name
    rename_table :players, :tt_profiles
  end
end
