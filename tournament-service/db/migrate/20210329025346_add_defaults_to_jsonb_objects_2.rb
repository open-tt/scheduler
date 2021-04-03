class AddDefaultsToJsonbObjects2 < ActiveRecord::Migration[5.0]
  def change
    change_column_default :tournaments, :creator, {}
    change_column_default :tournaments, :players, []
    change_column_default :tournaments, :creator, []
  end
end
