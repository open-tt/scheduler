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

  def generate_groups
    if players.nil? || !players.count
      count = players.nil? ? 0 : players.count.positive?
      raise StandardError, `Not enough players [#{count}]`
    end
    min = Rails.application.config.tournament[:group][:min]
    max = Rails.application.config.tournament[:group][:max]
    group_sizes = size_groups(players.count, min, max)

    groups = []
    group_players = []
    group_index = 0
    players.each do |player|
      if group_sizes[group_index] <= 0
        groups.push({
                      players: group_players,
                      matches: []
                    })
        group_players = []
        group_index += 1
      end
      group_players.push(player)
      group_sizes[group_index] -= 1
    end
    return if group_players.empty?

    groups.push({
                  players: group_players,
                  matches: []
                })
    self.groups = groups
  end

  private

  def size_groups(total, min, max)
    return [] if total < min
    return [total] if total >= min && total <= max

    index = max
    while index >= min
      arr = size_groups(total - i, min, max)
      return [index] + arr if arr.count.positive?

      index -= 1
    end
    []
  end

  def validate_unique_player(player_hash)
    players.each do |player|
      return false if player['id'] == player_hash[:id]
    end
    true
  end
end
