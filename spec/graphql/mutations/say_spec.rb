require 'rails_helper'

RSpec.describe 'Mutations::Say', :graphql do
  let(:query_string) do
    %(
      mutation say($input: SayInput!) {
        say(input: $input) {
          completed
        }
      }
    )
  end
  let!(:variables) {
    {
      input: {
        text: 'テスト',
      },
    }
  }

  it_behaves_like :need_authorization, :say

  it { expect(response[:errors]).to be_blank }
  it { expect(response[:data][:say][:completed]).to be_truthy }

  context 'text is empty' do
    let!(:variables) {
      {
        input: {
          text: '',
        },
      }
    }

    it { expect(response[:errors]).to be_present }
  end
end
