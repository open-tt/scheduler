class AddMatchReferenceToMatchSet < ActiveRecord::Migration[5.0]
  def change
    add_reference :match_sets, :match, foreign_key: true
  end
end
