# frozen_string_literal: true

class Tournament < ApplicationRecord
  enum stage: %i[registration classification playoffs end]
end
