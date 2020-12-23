class CreateActions < ActiveRecord::Migration[5.0]
  def change
    create_table :actions do |t|
      t.string :url_regex
      t.integer :method

      t.timestamps
    end
  end
end
