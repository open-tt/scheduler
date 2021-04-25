class AddProfileIdToUser < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :tt_profile, foreign_key: true
  end
end
