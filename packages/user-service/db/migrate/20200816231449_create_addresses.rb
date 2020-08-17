class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :addresses do |t|
      t.references :org, foreign_key: true
      t.string :addr_1
      t.string :addr_2
      t.string :city
      t.string :state
      t.string :zip

      t.timestamps
    end
  end
end
