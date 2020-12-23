class RenameColumnInReservations < ActiveRecord::Migration[5.0]
  def change
    rename_column :reservations, :duration, :duration_in_minutes
  end
end
