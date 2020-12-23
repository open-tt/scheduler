# frozen_string_literal: true

class CreateReservations < ActiveRecord::Migration[5.0]
  def change
    create_table :reservations do |t|
      t.integer :location_id
      t.integer :user_id
      t.integer :coach_id
      t.integer :start_timestamp
      t.integer :duration
      t.integer :size
      t.integer :kind

      t.timestamps

      t.index %i[location_id user_id start_timestamp], unique: true, name: 'index_on_location_id_and_user_id_and_start_timestamp'
    end
  end
end
