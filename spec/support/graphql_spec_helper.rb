module GraphqlSpecHelper
  shared_context "Graphql" do
    let(:schema) { AppSchema }
    let(:context) {
      {
        current_user: current_user,
        user_signed_in: user_signed_in,
      }
    }
    let(:user_signed_out_context) {
      {
        current_user: nil,
        user_signed_in: false,
      }
    }
    let(:variables) { {} }
    let(:current_user) { create(:user) }
    let(:user_signed_in) { current_user.present? }
    subject(:response) {
      res = schema.execute(
        query_string,
        context: context,
        variables: variables,
      )
      # Print any errors
      if res["errors"]
        puts res["errors"].inspect
      end
      res.with_indifferent_access
    }

    shared_examples :need_authorization do |operation_name|
      let(:context) { user_signed_out_context }
      it "should result is null" do
        expect(response[:errors]).to be_blank
        expect(response[:data][operation_name.to_s.camelize(:lower).to_sym]).to be_nil
      end
    end
  end
end

RSpec.configure do |config|
  config.include_context "Graphql", :graphql
end
