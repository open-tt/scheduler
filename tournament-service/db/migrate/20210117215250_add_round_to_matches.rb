class AddRoundToMatches < ActiveRecord::Migration[5.0]
  def change
    add_reference :matches, :round, foreign_key: true, required: false
  end
end
