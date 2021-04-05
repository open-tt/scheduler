class Round < ApplicationRecord
  belongs_to :playoff
  has_many :matches, dependent: :destroy

  def final?
    !matches.nil? && matches.count == 1
  end

  def over?
    matches.each do |mat|
      return false unless mat.over?
    end
    true
  end

  def winners
    matches.map(&:winner).compact
  end

  def losers
    matches.map(&:loser).compact
  end

  def players
    matches.each do |mat|
      return [mat.player1_id, mat.player2_id]
    end.flatten
  end
end
