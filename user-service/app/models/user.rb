class User < ApplicationRecord
  has_secure_password

  has_and_belongs_to_many :roles
  has_and_belongs_to_many :orgs

  has_many :actions, through: :roles
  has_many :roles_users, class_name: 'RolesUsers'

  has_one :tt_profile, required: false

  validates_presence_of :name
  validates_uniqueness_of :email
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  def self.search_by_fields(params)
    sql = params.map { |k, _| "lower(#{k}) LIKE ?" }.join(' AND ')
    values = params.map { |_, v| "%#{v}%" }
    where(sql, *values)
  end

  def roles_summary
    roles_users.joins(:role).select('roles_users.id, roles_users.org_id, roles.name').map do |obj|
      {
        name: obj.name,
        org_id: obj.org_id,
        roles_users_id: obj.id
      }
    end
  end

  def account_tt_profile
    {
      id: id,
      name: name,
      email: email,
      profile_img: profile_img,
      phone: phone,
      address: address,
      tt_profile: tt_profile
    }
  end

  def profile
    {
      name: name,
      email: email,
      profile_img: profile_img,
      is_enabled: is_enabled
    }
  end

  def tournament_data
    {
      id: id,
      name: name,
      rating: rating,
      usattid: usattid
    }
  end

end
