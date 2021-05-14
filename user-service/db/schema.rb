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

ActiveRecord::Schema.define(version: 20210514000817) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actions", force: :cascade do |t|
    t.string   "url_regex"
    t.integer  "method"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["url_regex", "method"], name: "index_actions_on_url_regex_and_method", unique: true, using: :btree
  end

  create_table "actions_roles", force: :cascade do |t|
    t.integer  "action_id"
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["action_id"], name: "index_actions_roles_on_action_id", using: :btree
    t.index ["role_id"], name: "index_actions_roles_on_role_id", using: :btree
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
    t.index ["org_id"], name: "index_addresses_on_org_id", using: :btree
  end

  create_table "orgs", force: :cascade do |t|
    t.string   "name"
    t.boolean  "is_verified", default: false
    t.boolean  "is_enabled",  default: true
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "orgs_users", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "org_id"
    t.integer "role_id"
    t.index ["org_id"], name: "index_orgs_users_on_org_id", using: :btree
    t.index ["role_id"], name: "index_orgs_users_on_role_id", using: :btree
    t.index ["user_id"], name: "index_orgs_users_on_user_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_roles_on_name", unique: true, using: :btree
  end

  create_table "roles_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "org_id"
    t.index ["role_id"], name: "index_roles_users_on_role_id", using: :btree
    t.index ["user_id"], name: "index_roles_users_on_user_id", using: :btree
  end

  create_table "tt_profiles", force: :cascade do |t|
    t.integer  "tournamentrating",   default: 0
    t.integer  "leaguerating",       default: 0
    t.string   "usattid"
    t.string   "homeclub"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "user_id"
    t.string   "name"
    t.string   "blade"
    t.string   "forehand"
    t.string   "backhand"
    t.string   "hand"
    t.string   "grip"
    t.integer  "partner_min_rating"
    t.integer  "partner_max_rating"
    t.index ["user_id"], name: "index_tt_profiles_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string  "email",           default: "",    null: false
    t.string  "name"
    t.string  "profile_img"
    t.boolean "is_enabled",      default: false
    t.string  "password_digest"
    t.string  "phone"
    t.string  "address"
    t.integer "tt_profile_id"
    t.string  "city"
    t.string  "zipcode"
    t.string  "club"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["tt_profile_id"], name: "index_users_on_tt_profile_id", using: :btree
  end

  add_foreign_key "actions_roles", "actions"
  add_foreign_key "actions_roles", "roles"
  add_foreign_key "addresses", "orgs"
  add_foreign_key "orgs_users", "orgs"
  add_foreign_key "orgs_users", "roles"
  add_foreign_key "orgs_users", "users"
  add_foreign_key "roles_users", "roles"
  add_foreign_key "roles_users", "users"
  add_foreign_key "tt_profiles", "users"
  add_foreign_key "users", "tt_profiles"
end
