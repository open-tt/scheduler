class AddIdToPlayer < ActiveRecord::Migration[5.0]
  def change
    add_column :players, :id, :primary_key
  end
end
