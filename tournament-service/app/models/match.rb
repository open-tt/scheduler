# frozen_string_literal: true

class Match < ApplicationRecord
  belongs_to :group, required: false
  belongs_to :playoff, required: false
  belongs_to :round, required: false
  has_many :match_sets, dependent: :destroy

  # returns id of winner or -1
  def winner
    return player1_id if player1_won
    return player2_id if player2_won

    -1
  end

  def is_over?
    player1_won or player2_won
  end

  def player_x_won(player_id)
    return player1_won if player_id == player1_id
    return player2_won if player_id == player2_won

    false
  end

  def player1_won
    player1_count_sets_won > best_of / 2
  end

  def player2_won
    player2_count_sets_won > best_of / 2
  end

  def player1_count_sets_won
    # TODO: there is probably a 1 liner to do this count
    c = 0
    match_sets.each do |set|
      c += 1 if set.player_won(player1_id)
    end
    c
  end

  def player2_count_sets_won
    # TODO: there is probably a 1 liner to do this count
    c = 0
    match_sets.each do |set|
      c += 1 if set.player_won(player2_id)
    end
    c
  end

  def finished
    player1_won or player2_won
  end
end
