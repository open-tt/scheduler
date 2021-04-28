class ChangeEndTimestampOnReservation < ActiveRecord::Migration[5.0]
  def change
    remove_column :reservations, :end_timestamp
    add_column :reservations, :end_timestamp, :integer
  end
end
