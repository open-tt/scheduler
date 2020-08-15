class OrgController < ApplicationController
  def create
    org = Org.create(org_parameters)
    org.orgs_users.create!(user_id: params[:user_id])
    if org.persisted?
      render json: { success: true, org: org.attributes }, status: :created
    else
      render json: { errors: org.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    raise StandardError 'not implemented...'
  end

  def add_user
    raise StandardError 'not implemented...'
  end

  def add_address
    raise StandardError 'not implemented...'
  end

  def remove_address
    raise StandardError 'not implemented...'
  end

  def all_users
    raise StandardError 'not implemented...'
  end

  def all_addresses
    raise StandardError 'not implemented...'
  end

  private

  def org_parameters
    raw_params = params.permit(:org_name, :is_verified, :is_enabled)
    {
      name: raw_params[:org_name],
      is_verified: raw_params[:is_verified],
      is_enabled: raw_params[:is_enabled]
    }
  end
end
