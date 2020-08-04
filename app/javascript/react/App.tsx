import React from 'react'
import * as Sentry from '@sentry/react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/graphql/apollo'

function FallbackComponent() {
  return <div>An error has occured</div>
}

type Props = {}

// type State = {}

const App: React.FC<Props> = () => {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <ApolloProvider client={apolloClient}>
        <div>Hello React</div>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}

export default App
