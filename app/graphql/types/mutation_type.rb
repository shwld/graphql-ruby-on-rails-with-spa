module Types
  class MutationType < Types::BaseObject
    field :edit_user, mutation: Mutations::EditUser
    field :say, mutation: Mutations::Say
  end
end
