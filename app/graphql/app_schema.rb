class AppSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST
  use GraphQL::Subscriptions::ActionCableSubscriptions

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections

  use GraphQL::Batch

  def self.object_from_id(unique_id, context)
    splitted_id = unique_id.split('_')
    splitted_id[0].constantize.find_by(id: splitted_id[1])
  end

  def self.id_from_object(object, type, context)
    "#{object.class.name}_#{object.id}"
  end
end
