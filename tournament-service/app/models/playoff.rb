class Playoff < ApplicationRecord
  belongs_to :tournament
  has_many :matches, dependent: :destroy
  has_many :rounds, dependent: :destroy

  def update_match(player1, player1_score, player2, player2_score)
    match = rounds.last.matches.select do |mat|
      mat.player1_id == player1.to_i && mat.player2_id == player2.to_i
    end.first
    match.over?
    if match.over?
      raise StandardError, "Cannot add set to match {#{match.id}} that has already finished. Winner #{match.winner}"
    end

    match.match_sets.create!(
      player1_id: player1,
      player1_score: player1_score,
      player2_id: player2,
      player2_score: player2_score
    )
  end

  def over?
    rounds.last.final? && rounds.last.over?
  end

  def create_next_round
    prev_round = rounds.last
    return if prev_round.final? || !prev_round.over?

    round = rounds.create!

    i = 0
    while i < prev_round.matches.count
      winner_a = prev_round.matches[i].winner
      winner_b = prev_round.matches[i + 1].winner
      round.matches.create!(
        best_of: 5,
        player1_id: winner_a,
        player2_id: winner_b
      )
      i += 2
    end
  end

  def winner
    return nil unless over?

    rounds.last.winners.last
  end

  def runnerup
    return nil unless over?

    rounds.last.losers.last
  end
end
