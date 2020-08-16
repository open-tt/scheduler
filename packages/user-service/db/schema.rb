# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20200816225656) do

  create_table "actions", force: :cascade do |t|
    t.string   "url_regex"
    t.integer  "method"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "actions_roles", force: :cascade do |t|
    t.integer  "action_id"
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["action_id"], name: "index_actions_roles_on_action_id"
    t.index ["role_id"], name: "index_actions_roles_on_role_id"
  end

  create_table "addresses", force: :cascade do |t|
    t.integer  "org_id"
    t.string   "addr_1"
    t.string   "addr_2"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["org_id"], name: "index_addresses_on_org_id"
  end

  create_table "orgs", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "is_verified", default: false
    t.boolean  "is_enabled",  default: true
  end

  create_table "orgs_users", force: :cascade do |t|
    t.integer  "org_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["org_id"], name: "index_orgs_users_on_org_id"
    t.index ["user_id"], name: "index_orgs_users_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "org_id"
    t.index ["role_id"], name: "index_roles_users_on_role_id"
    t.index ["user_id"], name: "index_roles_users_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string  "email",           default: "",    null: false
    t.string  "name"
    t.string  "profile_img"
    t.boolean "is_enabled",      default: false
    t.string  "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
