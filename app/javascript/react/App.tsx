import React from 'react'
import * as Sentry from '@sentry/react'

function FallbackComponent() {
  return <div>An error has occured</div>
}

type Props = {}

// type State = {}

const App: React.FC<Props> = () => {
  return (
    <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
      <div>Hello React</div>
    </Sentry.ErrorBoundary>
  )
}

export default App
