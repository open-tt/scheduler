class TtProfileController < ApplicationController
  def import
    batch = params[:batch]
    cnt = 0
    batch.each do |profile|
      profile_params = profile.permit(
        :name,
        :usattid,
        :homeclub,
        :tournamentrating,
        :leaguerating
      )
      obj = TtProfile.create(profile_params)
      cnt += 1 if obj.valid?
    end
    render json: { accepted_profiles: cnt }
  end

  def index
    players = TtProfile.all
    render json: players, status: :ok
  end

  private

  def validate_profiles(batch)
    profiles = batch.map do |profile|
      profile_params = profile.permit(
        :name,
        :usattid,
        :homeclub,
        :tournamentrating,
        :leaguerating
      )
      TtProfile.new(profile_params)
    end
    profiles.select(&:valid?)
  end
end
