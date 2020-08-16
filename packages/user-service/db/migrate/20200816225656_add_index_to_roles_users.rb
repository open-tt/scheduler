class AddIndexToRolesUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :roles_users, :user_id, :integer
  end
end
