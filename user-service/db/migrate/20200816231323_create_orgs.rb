class CreateOrgs < ActiveRecord::Migration[5.0]
  def change
    create_table :orgs do |t|
      t.string :name
      t.boolean :is_verified, default: false
      t.boolean :is_enabled, default: true

      t.timestamps
    end
  end
end
