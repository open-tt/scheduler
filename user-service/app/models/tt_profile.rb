class TtProfile < ApplicationRecord
  belongs_to :user, required: false
  validates :usattid, uniqueness: true, allow_nil: true
  after_create :ensure_user

  private

  def ensure_user
    return unless user.nil?

    User.create(
      name: name,
      email: "#{name.delete(' ')}@#{SecureRandom.hex}.fakemail.com",
      tt_profile: self,
      password: SecureRandom.hex
    )
  end
end
