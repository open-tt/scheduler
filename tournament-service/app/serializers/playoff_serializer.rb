class PlayoffSerializer < ActiveModel::Serializer
  attributes :id, :rounds, :over, :first, :second
  # has_many :matches # todo: investigate why this is not working. it works for tournament and groups

  def matches
    @object.matches.map do |match|
      MatchSerializer.new(match)
    end
  end

  def rounds
    res = @object.rounds.map do |round|
      RoundSerializer.new(round)
    end
    return nil if res.nil? || res.empty?

    round_match_count = res.last.matches.count
    while round_match_count > 1
      new_round = {
        matches: []
      }
      new_round_matches = round_match_count / 2
      (1..new_round_matches).each do
        new_round[:matches].push({
                                   fake: true
                                 })
      end
      res.push new_round

      round_match_count /= 2
    end
    res
  end

  def over
    @object.over?
  end

  def first
    @object.winner
  end

  def second
    @object.runnerup
  end
end

# export interface Playoff {
#   id: number;
#   rounds: PlayoffRound;
#   over: boolean;
#   first: Player;
#   second: Player;
#   third: Player[];
# }

