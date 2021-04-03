class MatchSerializer < ActiveModel::Serializer
  attributes :id,
             :player1_id,
             :player2_id,
             :over?,
             :player1_won?,
             :player2_won?,
             :player1_count_sets_won,
             :player2_count_sets_won,
             :match_sets
end
