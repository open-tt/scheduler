class CreateOrgs < ActiveRecord::Migration[5.0]
  def change
    create_table :orgs do |t|
      t.string :name

      t.timestamps
    end
  end
end
