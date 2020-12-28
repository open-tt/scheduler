class CreateTournaments < ActiveRecord::Migration[5.0]
  def change
    create_table :tournaments do |t|
      t.date :scheduled_at
      t.integer :stage
      t.jsonb :creator
      t.jsonb :players
      t.jsonb :groups
      t.jsonb :waitingList
      t.jsonb :playoffs

      t.timestamps
    end
  end
end
