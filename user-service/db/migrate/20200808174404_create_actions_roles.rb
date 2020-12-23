class CreateActionsRoles < ActiveRecord::Migration[5.0]
  def change
    create_table :actions_roles do |t|
      t.references :action, foreign_key: true
      t.references :role, foreign_key: true

      t.timestamps
    end
  end
end
