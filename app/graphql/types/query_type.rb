module Types
  class QueryType < Types::BaseObject
    field :user, Types::Objects::UserType, null: true do
      argument :id, ID, required: true
    end
    def user(id:)
      Loaders::RecordLoader.for(User).load(id)
    end

    field :users, Types::Objects::UserType.connection_type, null: false
    def users(page: nil, items: nil)
      User.all
    end
  end
end
