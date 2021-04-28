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

ActiveRecord::Schema.define(version: 20210428042353) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "reservations", force: :cascade do |t|
    t.integer  "start_timestamp"
    t.integer  "kind"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "host"
    t.integer  "recipient"
    t.integer  "recipient_rsvp"
    t.string   "note"
    t.integer  "end_timestamp"
  end

  create_table "schedules", force: :cascade do |t|
    t.integer  "org_id"
    t.integer  "user_id"
    t.json     "hours"
    t.integer  "availability_per_interval"
    t.integer  "price_in_cents"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["org_id"], name: "index_schedules_on_org_id", unique: true, using: :btree
  end

end
