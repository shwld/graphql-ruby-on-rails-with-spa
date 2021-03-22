class AppSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
  subscription(Types::SubscriptionType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST
  use GraphQL::Execution::Errors
  use GraphQL::Subscriptions::ActionCableSubscriptions

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections

  use GraphQL::Batch

  def self.unauthorized_object(error)
    raise GraphQL::ExecutionError, "An object of type #{error.type.graphql_name} was hidden due to permissions"
  end

  rescue_from(ActiveRecord::RecordNotFound) do |error|
    raise GraphQL::ExecutionError.new 'RECORD_NOT_FOUND',
                                      extensions: {
                                        code: 'RECORD_NOT_FOUND',
                                      }
  end
  rescue_from(ActiveRecord::RecordInvalid) do |error|
    raise GraphQL::ExecutionError.new error.record.errors.full_messages.join(','),
                                      extensions: {
                                        code: 'RECORD_INVALID',
                                        record: {
                                          model: error.record.class.name,
                                          id: error.record.id,
                                          errors: error.record.errors.messages.transform_keys { |k| k.to_s.camelize(:lower) },
                                          messages: error.record.errors.full_messages,
                                        },
                                      }
  end
end
