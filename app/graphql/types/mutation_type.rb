module Types
  class MutationType < Types::BaseObject
    field :edit_user, mutation: Mutations::EditUser
  end
end
