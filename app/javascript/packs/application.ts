import * as Sentry from '@sentry/browser'
import '@/styles/application.sass'
import Rails from '@rails/ujs'
import * as ActiveStorage from '@rails/activestorage'

const SENTRY_DSN = (window as any).SENTRY_DSN
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new (Sentry.Integrations as any).Vue()]
  })
}

Rails.start()
ActiveStorage.start()
;(global as any).Rails = Rails
