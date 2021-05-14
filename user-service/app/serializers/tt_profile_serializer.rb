class TtProfileSerializer < ActiveModel::Serializer
  attributes :id, :usattid, :tournamentrating, :homeclub, :blade, :forehand,
             :backhand, :hand, :grip, :partner_min_rating
  belongs_to :user
end
