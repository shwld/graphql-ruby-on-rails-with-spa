class Mutations::Say < Mutations::BaseMutation
  null true

  argument :text, String, required: true

  field :completed, Boolean, null: true

  def resolve(text:)
    AppSchema.subscriptions.trigger(:on_message_added, {}, { message: text })
    { completed: true }
  end
end
