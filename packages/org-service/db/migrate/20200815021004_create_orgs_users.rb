class CreateOrgsUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :orgs_users do |t|
      t.references :org, foreign_key: true
      t.integer :user_id

      t.timestamps
    end
  end
end
