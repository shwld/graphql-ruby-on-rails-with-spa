class GraphqlSchemaController < ApplicationController
  protect_from_forgery with: :null_session

  def execute
    query = params[:query]
    operation_name = params[:operationName]
    result = AppSchema.execute(query, variables: {}, context: {}, operation_name: operation_name)
    render json: result
  end
end
