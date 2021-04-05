# frozen_string_literal: true

class Group < ApplicationRecord
  has_many :matches, dependent: :destroy
  belongs_to :tournament

  after_create :generate_matches

  def finished_all_matches?
    return false unless expected_total_matches == matches.count

    for mat in matches
      return false unless mat.over?
    end

    true
  end

  def total_matches_in_progress
    matches.map { |mat| mat.over? ? 0 : 1 }.reduce(:+)
  end

  def total_matches_over
    matches.map { |mat| mat.over? ? 1 : 0 }.reduce(:+)
  end

  def expected_total_matches
    players.combination(2).count
  end

  def standings
    data = {}
    players.each do |player_id|
      data[player_id] = count_matches_won_for(player_id)
    end

    res = data.sort_by do |_, player_score|
      -1 * player_score # multiply by -1 to sort descending
    end.map { |pair| pair[0] }
    res
  end

  def get_first_n(nth)
    ranks = standings
    return ranks if nth >= ranks.count

    nth_player_score = ranks[nth - 1]
    nth_1_player_score = ranks[nth]
    return ranks[0...nth] if nth_player_score != nth_1_player_score

    # There is a tie between nth and nth + 1 and possibly more.
    # Special function will handle that
    get_first_n_with_conflict(ranks, nth)
  end

  def count_matches_won_for(player_id)
    c = 0
    matches.each do |match|
      c += 1 if match.winner == player_id
    end
    c
  end

  def count_matches_loss_for(player_id)
    c = 0
    matches.each do |match|
      # Check if this player is on this match and if different from the winner
      c += 1 if match.over? &&
        [match.player1_id, match.player2_id].include?(player_id) &&
        (match.winner != player_id)
    end
    c
  end

  def result_between(player1_id, player2_id)
    match = matches.where(player1_id: player1_id, player2_id: player2_id).first
    return nil unless match

    [
      match.player1_count_sets_won,
      match.player2_count_sets_won
    ]
  end

  def add_player

  end

  def over?
    matches.each do |m|
      return false unless m.over?
    end
    true
  end

  private

  def generate_matches
    i = 0

    while i < players.count
      j = i + 1
      while j < players.count
        matches.create!(
          best_of: 5,
          player1_id: players[i],
          player2_id: players[j]
        )
        Rails.logger.warn `Created match for #{players[i]} and #{players[j]}`
        j += 1
      end
      i += 1
    end
  end

  def get_first_n_with_conflict(ranks, nth)
    val = ranks[nth][1]
    tied_players = []
    ranks.each do |player|
      score = player[1]
      tied_players.push player if score == val
    end

    tied_players_order = rank_tied_players(tied_players)

    x = 0
    tied_players.each do |player|
      ind = ranks.index(player)
      ranks[ind] = tied_players_order[x]
      x += 1
    end
    ranks
  end

  def rank_tied_players(players)
    internal_wins = Array.new(players.count, [-1, 0])
    (0...players.count).each do |i|
      (i + 1...players.count).each do |ii|
        res = result_between(i, ii)
        internal_wins[i][0] = players[i][0]
        internal_wins[i][1] += res[0] - res[1]

        internal_wins[ii][0] = players[ii][0]
        internal_wins[ii][1] += res[1] - res[0]
      end
    end
    internal_wins.sort_by { |player| player[1] }
  end
end
