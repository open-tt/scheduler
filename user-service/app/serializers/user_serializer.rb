class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :profile_img, :phone, :address

  has_one :tt_profile
end
