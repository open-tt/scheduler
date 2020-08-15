class RenameTableUsersRoles < ActiveRecord::Migration[5.0]
  def change
    rename_table :users_roles, :roles_users
  end
end
