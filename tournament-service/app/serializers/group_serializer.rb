class GroupSerializer < ActiveModel::Serializer
  attributes :id, :players, :matches

  def matches
    @object.matches.map do |match|
      MatchSerializer.new(match)
    end
  end
end
