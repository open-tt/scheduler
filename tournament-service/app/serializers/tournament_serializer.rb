class TournamentSerializer < ActiveModel::Serializer
  attributes :id, :scheduled_at, :stage, :creator, :players, :waitingList, :playoffs
  has_many :groups
end
