class MatchSerializer < ActiveModel::Serializer
  attributes :id,
             :player1_id,
             :player2_id,
             :is_over,
             :player1_won,
             :player2_won,
             :player1_count_sets_won,
             :player2_count_sets_won,
             :match_sets

  def is_over
    @object.over?
  end

  def player1_won
    @object.player1_won?
  end

  def player2_won
    @object.player2_won?
  end
end
