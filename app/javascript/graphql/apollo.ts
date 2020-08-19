import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  Operation,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import Rails from '@rails/ujs'
import * as Sentry from '@sentry/browser'
import ActionCable from 'actioncable'
import { ActionCableLink } from './actionCableLink'

const cable = ActionCable.createConsumer()

const { GRAPHQL_BASE_URL } = process.env

const operationInfo = (operation: Operation) => ({
  type: operation.query.definitions.find((defn) => defn.kind)?.kind,
  name: operation.operationName,
  fragments: operation.query.definitions
    .filter((defn) => defn.kind === 'FragmentDefinition')
    .map((defn) => defn.loc?.source.name)
    .join(', '),
})

const sentryLink = new ApolloLink((operation, forward) => {
  if (process.env.NODE_ENV === 'development') {
    console.table(operationInfo(operation))
  }
  Sentry.addBreadcrumb({
    category: 'graphql',
    data: operationInfo(operation),
    level: Sentry.Severity.Debug,
  })
  return forward(operation)
})

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-CSRF-Token': Rails.csrfToken(),
    },
  }
})

const link = ApolloLink.split(
  ({ query: { definitions } }) => {
    return definitions.some(
      /** FIX: type */
      ({ kind, operation }: any) =>
        kind === 'OperationDefinition' && operation === 'subscription'
    )
  },
  new ActionCableLink({ cable }),
  createHttpLink({
    uri: GRAPHQL_BASE_URL,
  })
)

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    sentryLink,
    onError(({ graphQLErrors, networkError, forward, operation }) => {
      Sentry.addBreadcrumb({
        category: 'graphql',
        data: operationInfo(operation),
        level: Sentry.Severity.Debug,
      })
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          const { message, locations, path } = error
          console.warn(
            `[GraphQL error]: Message: ${message}, Path: ${JSON.stringify(
              path
            )}`,
            locations
          )
          Sentry.captureException(error)
        })
      }
      if (networkError) {
        console.warn(`[Network error]: ${JSON.stringify(networkError)}`)
        // Sentry.captureException(networkError)
      }
      return forward(operation)
    }),
    authLink.concat(link),
  ]),
  cache,
})
