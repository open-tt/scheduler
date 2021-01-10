class AddGroupReferenceToMatch < ActiveRecord::Migration[5.0]
  def change
    add_reference :matches, :group, foreign_key: true
  end
end
