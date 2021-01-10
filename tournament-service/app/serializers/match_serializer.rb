class MatchSerializer < ActiveModel::Serializer
  attributes :id, :player1_id, :player2_id
  has_many :match_sets
end
