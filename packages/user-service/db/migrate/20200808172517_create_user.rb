# frozen_string_literal: true

class CreateUser < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string   :email, default: '', null: false
      t.string   :name
      t.string   :profile_img
      t.boolean  :is_enabled, default: false
      t.string   :password_digest
      t.index ['email'], name: 'index_users_on_email', unique: true
    end
  end
end
