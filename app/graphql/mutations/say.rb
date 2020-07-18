class Mutations::Say < Mutations::BaseMutation
  null true

  argument :text, String, required: true

  field :completed, Boolean, null: true

  def resolve(text:)
    message = Forms::Message.new(text: text)
    message.valid!
    AppSchema.subscriptions.trigger(:on_message_added, {}, { message: text })
    { completed: true }
  end
end
