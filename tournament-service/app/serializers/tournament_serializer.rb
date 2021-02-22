class TournamentSerializer < ActiveModel::Serializer
  attributes :id, :scheduled_at, :stage, :creator, :players, :waitingList
  has_many :groups
  has_one :playoff
end
