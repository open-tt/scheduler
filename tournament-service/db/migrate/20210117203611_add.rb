class Add < ActiveRecord::Migration[5.0]
  def change
    add_column :matches, :playoff_id, :integer, foreign_key: true
  end
end
