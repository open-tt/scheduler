class RemoveComlumnsFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_columns :users, :rating, :usattid, :homeclub, :location
  end
end
