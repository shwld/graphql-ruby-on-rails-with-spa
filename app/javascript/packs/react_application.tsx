import { App } from '@/react/App'
import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/react_application.sass'

const SENTRY_DSN = (window as any).SENTRY_DSN
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  )
})
