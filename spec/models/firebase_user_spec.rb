# == Schema Information
#
# Table name: firebase_users
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :string           not null
#
require 'rails_helper'

RSpec.describe FirebaseUser, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
