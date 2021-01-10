class TournamentSerializer < ActiveModel::Serializer
  attributes :id, :scheduled_at, :stage, :creator, :players, :waiting_list, :playoffs
  has_many :groups
end
