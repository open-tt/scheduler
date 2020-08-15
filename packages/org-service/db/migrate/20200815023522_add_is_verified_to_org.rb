class AddIsVerifiedToOrg < ActiveRecord::Migration[5.0]
  def change
    add_column :orgs, :is_verified, :boolean, default: false
    add_column :orgs, :is_enabled, :boolean, default: true
  end
end
