class CreateOrgsUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :orgs_users, id: false do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :org, foreign_key: true
      t.belongs_to :role, foreign_key: true
    end
  end
end
