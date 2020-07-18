class Types::SubscriptionType < Types::BaseObject
  field :on_message_added, subscription: Subscriptions::OnMessageAdded
end
