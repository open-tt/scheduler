class ChangeTournamentColumnTypes < ActiveRecord::Migration[5.0]
  def change
    remove_column :tournaments, :groups
    add_reference :groups, :tournament, foreign_key: true
  end
end
