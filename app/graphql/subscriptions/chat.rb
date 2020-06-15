class Subscriptions::Chat < Subscriptions::BaseSubscription
  field :messages, [String], null: false

  def subscribe
    { messages: [] }
  end

  def update
    { messages: [] }
  end
end
