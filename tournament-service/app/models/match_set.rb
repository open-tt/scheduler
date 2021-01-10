# frozen_string_literal: true

class MatchSet < ApplicationRecord
  belongs_to :match

  # returns id of winner or -1 if game not finished
  def winner
    return player1_id if player1_won
    return player2_id if player2_won

    -1
  end

  def player1_won
    player1_score >= 11 and player1_score - 2 >= player2_score
  end

  def player2_won
    player2_score >= 11 and player2_score - 2 >= player1_score
  end

  def finished
    player1_won or player2_won
  end
end
