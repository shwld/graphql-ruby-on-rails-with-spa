class Mutations::EditUser < Mutations::BaseMutation
  null true

  argument :user_id, ID, required: true
  argument :example, String, required: false

  field :user, Types::Objects::UserType, null: true

  def authorized?(user_id:, **args)
    @user = User.find(user_id)
    context[:user_signed_in] and UserPolicy.new(context[:current_user], @user).edit?
  end

  def resolve(user_id:, **args)
    # TODO: update
    { user: user }
  end
end
