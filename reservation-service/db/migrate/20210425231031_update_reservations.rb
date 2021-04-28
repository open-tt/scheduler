class UpdateReservations < ActiveRecord::Migration[5.0]
  def change
    remove_column :reservations, :location_id
    remove_column :reservations, :user_id
    remove_column :reservations, :coach_id
    remove_column :reservations, :duration_in_minutes
    remove_column :reservations, :size

    add_column :reservations, :host, :integer
    add_column :reservations, :recipient, :integer
    add_column :reservations, :recipient_rsvp, :integer
    add_column :reservations, :end_timestamp, :datetime
    add_column :reservations, :note, :string
  end
end
