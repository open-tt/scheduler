class Add < ActiveRecord::Migration[5.0]
  def change
    add_column :roles_users, :org_id, :integer
  end
end
