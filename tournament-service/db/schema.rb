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

ActiveRecord::Schema.define(version: 20210117215250) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "groups", force: :cascade do |t|
    t.integer  "players",                    array: true
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "tournament_id"
    t.index ["tournament_id"], name: "index_groups_on_tournament_id", using: :btree
  end

  create_table "match_sets", force: :cascade do |t|
    t.integer  "player1_id"
    t.integer  "player1_score"
    t.integer  "player2_id"
    t.integer  "player2_score"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "match_id"
    t.index ["match_id"], name: "index_match_sets_on_match_id", using: :btree
  end

  create_table "matches", force: :cascade do |t|
    t.integer  "best_of"
    t.integer  "player1_id"
    t.integer  "player2_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "group_id"
    t.integer  "playoff_id"
    t.integer  "round_id"
    t.index ["round_id"], name: "index_matches_on_round_id", using: :btree
  end

  create_table "playoffs", force: :cascade do |t|
    t.integer  "tournament_id"
    t.integer  "first_places",               array: true
    t.integer  "second_places",              array: true
    t.integer  "extra_players",              array: true
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["tournament_id"], name: "index_playoffs_on_tournament_id", using: :btree
  end

  create_table "rounds", force: :cascade do |t|
    t.integer  "playoff_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playoff_id"], name: "index_rounds_on_playoff_id", using: :btree
  end

  create_table "tournaments", force: :cascade do |t|
    t.date     "scheduled_at"
    t.integer  "stage"
    t.jsonb    "creator"
    t.jsonb    "players"
    t.jsonb    "waitingList"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_foreign_key "groups", "tournaments"
  add_foreign_key "match_sets", "matches"
  add_foreign_key "matches", "groups"
  add_foreign_key "matches", "rounds"
  add_foreign_key "playoffs", "tournaments"
  add_foreign_key "rounds", "playoffs"
end
