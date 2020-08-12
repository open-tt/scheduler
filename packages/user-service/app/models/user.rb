class User < ApplicationRecord
  has_secure_password

  has_and_belongs_to_many :roles
  has_many :actions, through: :roles
  has_many :roles_users, class_name: 'RolesUsers'

  validates_presence_of :email, :name, :password_digest
  validates_uniqueness_of :email
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  def roles_summary
    roles_users.joins(:role).select('roles_users.id, roles_users.org_id, roles.name').map do |obj|
      {
        name: obj.name,
        org_id: obj.org_id,
        roles_users_id: obj.id
      }
    end
  end

  def profile
    {
      name: name,
      email: email,
      profile_img: profile_img,
      is_enabled: is_enabled
    }
  end

end
