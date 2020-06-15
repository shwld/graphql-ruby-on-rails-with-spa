class GraphqlSchemaController < ApplicationController
  skip_before_action :verify_authenticity_token

  def execute
    query = params[:query]
    operation_name = params[:operationName]
    result = AppSchema.execute(query, variables: {}, context: {}, operation_name: operation_name)
    render json: result
  end
end
