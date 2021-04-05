class RenamePlayersData < ActiveRecord::Migration[5.0]
  def change
    rename_column :players, :league_rating, :leaguerating
    rename_column :players, :tournament_rating, :tournamentrating
  end
end
