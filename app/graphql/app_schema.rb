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
end
