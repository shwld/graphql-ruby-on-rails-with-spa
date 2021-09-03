import { ApolloProvider } from '@apollo/client'
import * as Sentry from '@sentry/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Menu } from './components/organisms/Menu'
import { Routes } from './config/Routes'

import { apolloClient } from '@/graphql/apollo'

function FallbackComponent() {
  return <div>An error has occured</div>
}

export const App: React.FC = () => {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Menu />
          <Routes />
        </BrowserRouter>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  )
}
