class UpdatePlayers < ActiveRecord::Migration[5.0]
  def change
    remove_columns :players, :id, :location
  end
end
