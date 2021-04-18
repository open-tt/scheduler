class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:register]

  def show_current_user
    render json: { user: current_user }
  end

  def register
    user = User.new(create_user_params)
    user.roles_users.new(role_id: Role.player.id)

    if user.save
      if create_user_params[:player_id]
        prof = TtProfile.find(create_user_params[:player_id])
        prof&.update(user: user)
      end
      token = AuthenticateUser.call(user.email, user.password).result
      render json: {
        success: true,
        newUserID: user.id,
        enabled: user.is_enabled,
        token: token
      }, status: :created
      UserMailer.account_confirmation_email(user).deliver_later
    else
      render json: { success: false, messages: user.errors.full_messages }, status: :conflict
    end
  end

  def soft_register
    fake_email = generate_fake_email(
      [
        create_user_soft_params[:name],
        create_user_soft_params[:rating]
      ]
    )
    user = User.new(create_user_soft_params.merge(email: fake_email, password: fake_email, password_confirmation:
      fake_email))
    user.roles_users.new(role_id: Role.player.id)
    user.is_enabled = false

    if user.save
      render json: user.tournament_data, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :conflict
    end
  end

  def show
    user = User.find(params[:id])
    render json: { success: true, user: user.profile }, status: :ok
  end

  def show_tournament_data
    user = User.find(params[:id])
    render json: user.tournament_data, status: :ok
  end

  def edit
    user = User.find_by_id(params[:id])

    if user.nil?
      render json: { success: false, message: 'User does not exist' }, status: 404
    elsif user.update(edit_user_params)
      render status: :no_content
    else
      render json: { success: false, messages: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def add_role
    user = User.find(params[:id])
    org_id = params[:org_id]
    role = Role.find_by(name: params[:role])

    role_user = user.roles_users.find_by(org_id: org_id, role_id: role.id)
    RolesUsers.create!(user_id: user.id, org_id: org_id, role_id: role.id) if role_user.nil?
  end

  def remove_role
    user = User.find(params[:id])
    org_id = params[:org_id]
    role = Role.find_by(name: params[:role])
    user.roles_users.find_by(org_id: org_id, role_id: role.id)&.delete
  end

  private

  def validate_players(data)
    players = data.map do |player|
      player_params = player.permit(:name, :usattid, :location, :homeclub, :tournamentrating, :leaguerating)
      TtProfile.new(player_params)
    end
    players.select(&:valid?)
  end

  def create_user_params
    params.permit(
      :name, :email, :password, :password_confirmation,
      :is_enabled, :usattid, :location, :homeclub, :rating,
      :player_id
    )
  end

  def create_user_soft_params
    params.permit(:name, :rating, :usattid)
  end

  def generate_fake_email(stuff)
    email = ''
    stuff.each do |s|
      email += s.to_s
    end
    email += '@gmail.com'
    email.delete ' '
  end
end
