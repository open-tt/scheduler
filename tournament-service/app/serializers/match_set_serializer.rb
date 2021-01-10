class MatchSetSerializer < ActiveModel::Serializer
  attributes :id, :player1_id, :player1_score, :player2_id, :player2_score
end
