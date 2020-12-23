class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.integer :org_id
      t.integer :user_id
      t.json :hours
      t.integer :availability_per_interval
      t.integer :price_in_cents

      t.timestamps

      t.index :org_id, unique: true
    end
  end
end
