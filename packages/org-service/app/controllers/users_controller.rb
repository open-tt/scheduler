class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:register]

  def register
    user = User.new(create_user_params)
    user.roles_users.new(role_id: Role.player.id)

    if user.save
      render json: {
        success: true,
        newUserID: user.id,
        enabled: user.is_enabled,
        token: AuthenticateUser.call(user.email, user.password)
      }, status: :created
      UserMailer.account_confirmation_email(user).deliver_later
    else
      render json: { success: false, messages: user.errors.full_messages }, status: :conflict
    end
  end

  def show
    user = User.find(params[:id])
    render json: { success: true, user: user.profile }, status: :ok
  end

  def edit
    user = User.find_by_id(edit_user_params[:id])

    if edit_user_params.keys.count <= 1
      # params of size 1 only contains the user id, no useful information to update
      render json: { success: false, message: 'No fields to update' }, status: :unprocessable_entity
    elsif user.nil?
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

  def create_user_params
    params.permit(:name, :email, :password, :password_confirmation, :is_enabled)
  end

  def edit_user_params
    params.permit(:id, :name, :is_enabled, :profile_img)
  end
end
