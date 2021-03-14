# frozen_string_literal: true

class Tournament < ApplicationRecord
  has_many :groups, dependent: :destroy
  has_one :playoff, dependent: :destroy

  enum stage: %i[registration classification playoffs end]
  DEFAULT_MAX_PLAYERS_PER_GROUP = 4
  DEFAULT_MIN_PLAYERS_PER_GROUP = 3

  def classification_over?
    for gro in groups
      return false unless gro.finished_all_matches?
    end
    true
  end

  def playoffs_over?
  end

  def add_player(player_hash)
    raise StandardError, 'Cannot add player after classification is over' unless registration? || classification?

    self.players = [] if players.nil?
    raise StandardError, 'This player already exists' unless validate_unique_player player_hash

    players << player_hash

    (add_to_waiting_list(player_hash) unless add_to_group(player_hash)) if classification?
    create_extra_group if waitingList.count >= DEFAULT_MIN_PLAYERS_PER_GROUP
    save!
  end

  def create_extra_group
    groups.create!(players: waitingList.pluck('id'))
    self.waitingList = []
  end

  def add_to_waiting_list(player_hash)
    self.waitingList = [] if self.waitingList.nil?
    self.waitingList << player_hash
  end

  def add_to_group(player_hash)
    g = groups.select do |group|
      group.players.size < DEFAULT_MAX_PLAYERS_PER_GROUP
    end.first

    return false unless g

    g.players << player_hash['id']
    g.save!
    true
  end

  # //   return this.selectedTournament.groups.find(
  #   //     (g) => g.players.length < this.DEFAULT_MAX_PLAYERS_PER_GROUP
  # //   );
  # // For tournaments already in the Classification Stage (Groups)
  # // We need to add player to a group manually or to a waiting list
  # // if all groups are full.
  #   // Create new group if waitingList is at least the minimum players required
  # if (this.selectedTournament.stage === TournamentStage.CLASSIFICATION) {
  #   const g = this.findIncompleteGroup();
  # if (!g) {
  #   this.selectedTournament.waitingList.push(player);
  # if (
  #   this.selectedTournament.waitingList.length >=
  #     this.DEFAULT_MIN_PLAYERS_PER_GROUP
  # ) {
  #   const newGroup = new TournamentGroup(
  #                          this.selectedTournament.waitingList
  #                        );
  # this.selectedTournament.groups.push(newGroup);
  # this.selectedTournament.waitingList = [];
  # } else {
  #   alert(
  #     `All groups are full, added ${player.name} to the waiting list. ${this.selectedTournament.waitingList.length} Players waiting.`
  #   );
  # }
  # this.notifySelectedTournamentUpdates({
  #                                        tournament: true,
  #                                      });
  # } else {
  #   g.players.push(player);
  # this.notifySelectedTournamentUpdates({ group: true }, g);
  # }
  # }

  def remove_player(player_id)
    return if players.nil? || players.count.zero?

    players.each do |player|
      next unless player['id'].to_i == player_id

      players.delete player
      save!
      break
    end
  end

  def generate_groups
    return unless groups.nil? || groups.empty?

    min = Rails.application.config.tournament[:group][:min]
    max = Rails.application.config.tournament[:group][:max]
    return if players.nil? || !players.count || players.count < min

    group_sizes = size_groups(players.count, min, max)
    group_players = []
    group_index = 0
    players.each do |player|
      if group_sizes[group_index] <= 0
        groups.create!(players: group_players)
        group_players = []
        group_index += 1
      end
      group_players.push(player['id'])
      group_sizes[group_index] -= 1
    end
    return if group_players.empty?

    groups.create!(players: group_players)
    classification!
  end

  def expected_total_matches
    groups.map { |gro| gro.players.combination(2).count }.reduce(:+)
  end

  def generate_playoffs(ids)
    round1_players = []
    players.each do |player|
      round1_players.push player if ids.include? player['id']
    end
    round1_players.shuffle!
    r1 = create_round(round1_players, spots)
    r1
  end

  def groups_stage_winners!
    winners = []
    groups.each do |gro|
      winners.push gro.get_first_n(2)
    end
    # winners
    create_initial_round!(
      first_places(winners),
      second_places(winners),
      []
    )
    playoff.rounds
  end

  private

  #                 id, matches won
  # winners = [ [ [  1, 2           ],    # first place
  #               [  3, 1           ] ] ] # second place
  def first_places(winners_3d_arr)
    winners_3d_arr.map do |pair|
      pair[0][0]
    end
  end

  def second_places(winners_3d_arr)
    winners_3d_arr.map do |pair|
      pair[1][0]
    end
  end

  # - Assign first places evenly throughout the brackets
  # - Assign second places and extra randomly
  def create_initial_round!(first_places, second_places, extra_players)
    playoff = self.create_playoff! if playoff.nil?
    round1 = playoff.rounds.create!
    first_places.shuffle!
    total_players = first_places.count + second_places.count + extra_players.count
    total_matches = calc_matches_for_n_players(total_players)

    (0...total_matches).each do |_|
      round1.matches.create!(best_of: 5, player1_id: -1, player2_id: -1)
    end

    # Distribute first places evenly in matches
    # first_places[0] goes to first match, first_places[1] goes to last match
    # first_places[2] goes to second match, first_places[3] goes to second to match
    # etc...
    # There may be more matches than 1st places because we allow adding extra players manually
    front_winner = 0
    back_winner = 1
    front_match = 0
    back_match = total_matches - front_match - 1
    while front_winner < first_places.count
      round1.matches[front_match].update!(player1_id: first_places[front_winner])
      front_winner += 2
      next if back_match <= front_match

      round1.matches[back_match].update!(player1_id: first_places[back_winner])
      back_winner = front_winner + 1
      front_match += 1
      back_match -= 1
    end

    # Distribute 2nd places and extra players randomly
    players = (second_places + extra_players).shuffle
    next_player = 0
    round1.matches.each do |match|
      if match.player1_id == -1
        match.update!(player1_id: players[next_player])
        next_player += 1
      elsif match.player2_id == -1
        match.update!(player2_id: players[next_player])
        next_player += 1
      end
    end
  end

  def calc_matches_for_n_players(total)
    if total == 2
      1
    elsif total > 2 && total <= 4
      2
    elsif total > 4 && total <= 8
      4
    elsif total > 8 && total <= 16
      8
    elsif total > 16 && total <= 32
      16
    else
      raise StandardError, "We do not support more than 32 players, current count #{total}"
    end
  end

  def create_round(round_players, spots)
    c = round_players.count
    if c > 1
      div_players = round_players.in_groups(2)
      div_spots = spots.in_groups(2)
      return create_round(div_players[0], div_spots[0]).merge create_round(div_players[1], div_spots[1])
    end
    { spots.sample => c.first }
  end

  def round_count(count)
    if count > 8
      16
    elsif count > 4
      8
    elsif count > 2
      4
    else
      2
    end
  end

  def size_groups(total, min, max)
    return [] if total < min
    return [total] if total >= min && total <= max

    index = max
    while index >= min
      arr = size_groups(total - index, min, max)
      return [index] + arr if arr.count.positive?

      index -= 1
    end
    []
  end

  def validate_unique_player(player_hash)
    self.players.each do |player|
      return false if player['id'] == player_hash[:id]
    end
    true
  end
end
