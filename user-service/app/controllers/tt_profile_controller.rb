class TtProfileController < ApplicationController
  def import
    batch = params[:batch]
    profiles = validate_profiles(batch)
    TtProfile.import profiles
    render json: { accepted_profiles: profiles.count }
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
