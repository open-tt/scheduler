# frozen_string_literal: true

class Tournament < ApplicationRecord
  enum stage: %i[registration classification playoffs end]

  def add_player(player_hash)
    raise StandardError, 'This player already exists' unless validate_unique_player player_hash

    players << player_hash
  end

  def remove_player(player_id)
    return if players.nil? || players.count.zero?

    players.each do |player|
      next unless player['id'] == player_id

      players.delete player
      save!
      break
    end
  end

  private

  def validate_unique_player(player_hash)
    players.each do |player|
      return false if player['id'] == player_hash[:id]
    end
    true
  end
end
