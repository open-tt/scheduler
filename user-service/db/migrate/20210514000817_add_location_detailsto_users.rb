class AddLocationDetailstoUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :city, :string
    add_column :users, :zipcode, :string
    add_column :users, :club, :string
  end
end
