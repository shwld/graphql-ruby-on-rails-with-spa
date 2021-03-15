class CreateFirebaseUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :firebase_users, id: :uuid do |t|
      t.string :project_id, null: false
      t.timestamps
    end
  end
end
