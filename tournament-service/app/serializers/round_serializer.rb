class RoundSerializer < ActiveModel::Serializer
  attributes :id, :matches, :players, :winners, :is_over
  # has_many :matches # todo: investigate why this is not working. it works for tournament and groups

  def matches
    @object.matches.map do |match|
      MatchSerializer.new(match)
    end
  end

  def players
    @object.matches.map { |m| [m.player1_id, m.player2_id] }.flatten
  end

  def winners
    @object.matches.map(&:winner).compact
  end

  def is_over
    @object.over?
  end

  # export interface PlayoffRound {
  #   id: number;
  #   matches: Match[];
  #   players: int[];
  #   winners: int[];
  #   over: boolean;
  # }
end
