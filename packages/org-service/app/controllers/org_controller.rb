class OrgController < ApplicationController
  def create
    org = Org.create(org_create_params)
    org.orgs_users.create!(user_id: params[:user_id])
    if org.persisted?
      render json: { success: true, org: org.attributes }, status: :created
    else
      render json: { errors: org.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def org_search
    location_params = {}
    location_params[:addr_1] = org_search_params[:addr_1] unless org_search_params[:addr_1].nil?
    location_params[:city] = org_search_params[:city] unless org_search_params[:city].nil?
    location_params[:state] = org_search_params[:state] unless org_search_params[:state].nil?
    location_params[:zip] = org_search_params[:zip] unless org_search_params[:zip].nil?

    org_params = {}
    org_params[:name] = org_search_params[:org_name] unless org_search_params[:org_name].nil?
    owner_id = org_search_params[:owner_id] unless org_search_params[:owner_id].nil?

    command = SearchOrgs.call(org_params, location_params, owner_id)

    if command.success?
      render json: { success: true, orgs: command.result }, status: :ok
    else
      render json: { success: false, orgs: command.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    Org.update(params[:id], update_org_params)
    render status: :no_content
  end

  def add_user
    org = Org.find(params[:id])
    link = org.orgs_users.create(user_id: params[:user_id])
    if link.persisted?
      render json: { success: true }, status: :created
    else
      render json: { success: false, messages: link.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def remove_user
    link = OrgsUser.where(org_id: params[:id], user_id: params[:user_id]).last
    link&.destroy
  end

  def add_address
    org = Org.find(params[:id])
    address = org.addresses.create!(address_create_params)
    if address.persisted?
      render json: { success: true, address: address.attributes }, status: :created
    else
      render json: { success: false, errors: address.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def remove_address
    raise StandardError 'not implemented...'
  end

  def all_users
    raise StandardError 'not implemented...'
  end

  def all_addresses
    resp = Org.find(params[:id]).addresses.map(&:attributes)
    render json: { success: true, addresses: resp }, status: :ok
  end

  private

  def address_create_params
    params.permit(:addr_1, :addr_2, :city, :state, :zip)
  end

  def update_org_params
    raw = params.permit(:org_name, :is_enabled, :is_verified)
    raw[:name] = raw[:org_name]
    raw.delete 'org_name'
    raw
  end

  def org_search_params
    params.permit(:org_name, :owner_id, :addr_1, :city, :state, :zip)
  end

  def org_create_params
    raw_params = params.permit(:org_name, :is_verified, :is_enabled)
    {
      name: raw_params[:org_name],
      is_verified: raw_params[:is_verified],
      is_enabled: raw_params[:is_enabled]
    }
  end
end
