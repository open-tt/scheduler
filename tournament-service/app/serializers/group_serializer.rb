class GroupSerializer < ActiveModel::Serializer
  attributes :id, :players, :matches, :players_summary, :is_over

  def matches
    @object.matches.map do |match|
      MatchSerializer.new(match)
    end
  end

  def players_summary
    summary = {}
    standings = @object.over? ? @object.standings : nil

    @object.players.each do |player_id|
      summary[player_id] = {
        wins: @object.count_matches_won_for(player_id),
        loses: @object.count_matches_loss_for(player_id),
        place: standings.nil? ? nil : standings.index(player_id)+1
      }
    end
    summary
  end

  def is_over
    @object.over?
  end
end
