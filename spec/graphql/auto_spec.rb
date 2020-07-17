require 'rails_helper'

RSpec.describe 'GraphQL::Autotest' do
  it do
    expect {
      runner = GraphQL::Autotest::Runner.new(
        schema: AppSchema,
        context: {},
        logger: Logger.new(STDOUT),
      )
      runner.report!
    }.not_to raise_error
  end
end
