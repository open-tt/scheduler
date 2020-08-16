# frozen_string_literal: true

class SearchOrgs
  prepend SimpleCommand

  def initialize(org_params, location_params, owner_id)
    @org_params = org_params
    @location_params = location_params
    @owner_id = owner_id
  end

  def call
    orgs = by_location + by_owner + by_org
    orgs.uniq.map(&:attributes)
  end

  private

  attr_reader :org_params, :location_params, :owner_id

  def by_location
    return [] if location_params.nil? || location_params.empty?

    Org.joins(:addresses).where(addresses: location_params)
  end

  def by_owner
    return [] if owner_id.nil?

    Org.joins(:orgs_users).where("orgs_users.user_id = #{owner_id}")
  end

  def by_org
    return [] if org_params.nil? || org_params.empty?

    Org.where(org_params)
  end
end
