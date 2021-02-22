class PlayoffSerializer < ActiveModel::Serializer
  attributes :id, :matches, :rounds
  # has_many :matches # todo: investigate why this is not working. it works for tournament and groups

  def matches
    @object.matches.map do |match|
      MatchSerializer.new(match)
    end
  end

  def rounds
    @object.rounds
  end
end
