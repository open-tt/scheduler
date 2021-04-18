class AddNameToProfile < ActiveRecord::Migration[5.0]
  def change
    add_column :tt_profiles, :name, :string
  end
end
