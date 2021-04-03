# frozen_string_literal: true

class MatchSet < ApplicationRecord
  belongs_to :match

  # returns id of winner or -1 if game not finished
  def winner
    return match.player1_id if player1_won?
    return match.player1_id if player2_won?

    -1
  end

  def player_won(player_id)
    (player_id == match.player1_id and player1_won?) ||
      (player_id == match.player2_id and player2_won?)
  end

  def player1_won?
    player1_score and
      player1_score >= 11 and
      player1_score - 2 >= player2_score
  end

  def player2_won?
    player2_score and
      player2_score >= 11 and
      player2_score - 2 >= player1_score
  end

  def finished?
    player1_won? or player2_won?
  end
end
