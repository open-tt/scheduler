class MakeRoleNameUnique < ActiveRecord::Migration[5.0]
  def change
    add_index :roles, :name, unique: true
    add_index :actions, [:url_regex, :method], unique: true
  end
end
