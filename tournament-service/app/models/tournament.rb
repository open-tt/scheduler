# frozen_string_literal: true

class Tournament < ApplicationRecord
  has_many :groups

  enum stage: %i[registration registration_over classification classification_over playoffs playoffs_over end]

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
    return unless groups.nil? || groups.empty?

    if players.nil? || !players.count
      count = players.nil? ? 0 : players.count
      raise StandardError, `Not enough players [#{count}]`
    end
    min = Rails.application.config.tournament[:group][:min]
    max = Rails.application.config.tournament[:group][:max]
    group_sizes = size_groups(players.count, min, max)
    group_players = []
    group_index = 0
    players.each do |player|
      if group_sizes[group_index] <= 0
        groups.create!(players: group_players)
        group_players = []
        group_index += 1
      end
      group_players.push(player['id'])
      group_sizes[group_index] -= 1
    end
    return if group_players.empty?

    groups.create!(players: group_players)
  end

  def expected_total_matches
    groups.map { |gro| gro.players.combination(2).count }.reduce(:+)
  end

  def generate_playoffs(ids)
    round1_players = []
    players.each do |player|
      round1_players.push player if ids.include? player['id']
    end
    round1_players.shuffle!
    r1 = create_round(round1_players, spots)
    return r1
  end

  def groups_stage_winners
    winners = []
    groups.each do |gro|
      winners.push gro.get_first_n(2)
    end
    winners
  end

  private

  def create_round(round_players, spots)
    c = round_players.count
    if c > 1
      div_players = round_players.in_groups(2)
      div_spots = spots.in_groups(2)
      return create_round(div_players[0], div_spots[0]).merge create_round(div_players[1], div_spots[1])
    end
    { spots.sample => c.first }
  end

  def round_count(count)
    if count > 8
      16
    elsif count > 4
      8
    elsif count > 2
      4
    else
      2
    end
  end

  def size_groups(total, min, max)
    return [] if total < min
    return [total] if total >= min && total <= max

    index = max
    while index >= min
      arr = size_groups(total - index, min, max)
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
