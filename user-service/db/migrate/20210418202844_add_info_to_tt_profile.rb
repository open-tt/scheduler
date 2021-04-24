class AddInfoToTtProfile < ActiveRecord::Migration[5.0]
  def change
    add_column :tt_profiles, :blade, :string
    add_column :tt_profiles, :forehand, :string
    add_column :tt_profiles, :backhand, :string
    add_column :tt_profiles, :hand, :string
    add_column :tt_profiles, :grip, :string
    add_column :tt_profiles, :partner_min_rating, :integer
    add_column :tt_profiles, :partner_max_rating, :integer
  end
end
