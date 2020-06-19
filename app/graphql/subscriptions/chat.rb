class Subscriptions::Chat < Subscriptions::BaseSubscription
  field :messages, [String], null: false
  # argument :message, String, required: true

  def subscribe
    { messages: [ 'スタート' ] }
  end

  def update
    { messages: [object[:message]] }
  end
end
