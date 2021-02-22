class Round < ApplicationRecord
  belongs_to :playoff
  has_many :matches

  def is_final?
    !matches.nil? && matches.count == 1
  end

  def is_over?
    matches.each do |mat|
      return false unless mat.is_over?
    end
    true
  end

  def winners
    matches.map(&:winner)
  end
end
