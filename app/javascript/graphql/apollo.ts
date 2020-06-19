import Rails from '@rails/ujs'
import * as ActionCable from 'actioncable'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { ActionCableLink } from './actionCableLink'

const cable = ActionCable.createConsumer()

const { GRAPHQL_BASE_URL } = process.env

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-CSRF-Token': Rails.csrfToken()
    }
  }
})

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable }),
  createHttpLink({
    uri: GRAPHQL_BASE_URL
  })
)

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink.concat(link)]),
  cache
})
