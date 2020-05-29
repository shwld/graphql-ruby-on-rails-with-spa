class Mutations::EditUser < Mutations::BaseMutation
  null true

  argument :user_id, ID, required: true, loads: Types::Objects::UserType
  argument :example, String, required: false

  field :user, Types::Objects::UserType, null: true

  def authorized?(user:, **args)
    context[:user_signed_in] and context[:current_user].id == user.id
  end

  def resolve(user:, **args)
    { user: user }
  end

end
