import '@/styles/application.sass'
import * as ActiveStorage from '@rails/activestorage'
import Rails from '@rails/ujs'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from '@/src/App'

Rails.start()
ActiveStorage.start()
;(global as any).Rails = Rails

const SENTRY_DSN = (window as any).SENTRY_DSN
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  )
})
