class AddUserReferenceToPlayers < ActiveRecord::Migration[5.0]
  def change
    add_reference :players, :user, foreign_key: true
  end
end
