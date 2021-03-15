import '@/styles/application.sass'
import { App } from '@/src/App'
import * as ActiveStorage from '@rails/activestorage'
import Rails from '@rails/ujs'
import * as Sentry from '@sentry/react'
import React from 'react'
import ReactDOM from 'react-dom'

Rails.start()
ActiveStorage.start()
;(global as any).Rails = Rails

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
