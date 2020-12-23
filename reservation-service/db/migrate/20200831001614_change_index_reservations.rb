class ChangeIndexReservations < ActiveRecord::Migration[5.0]
  def change
    remove_index :reservations, %i[location_id user_id start_timestamp]
    add_index :reservations, [:user_id, :start_timestamp]
  end
end
