class CreateRounds < ActiveRecord::Migration[5.0]
  def change
    create_table :rounds do |t|
      t.references :playoff, foreign_key: true

      t.timestamps
    end
  end
end
