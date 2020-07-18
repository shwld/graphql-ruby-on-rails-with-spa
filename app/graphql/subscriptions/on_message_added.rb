class Subscriptions::OnMessageAdded < Subscriptions::BaseSubscription
  field :message, String, null: false

  def subscribe
    { message: 'スタート' }
  end

  def update
    { message: object[:message] }
  end
end
