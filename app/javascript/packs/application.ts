import '@/styles/application.sass'
import * as ActiveStorage from '@rails/activestorage'
import Rails from '@rails/ujs'

Rails.start()
ActiveStorage.start()
;(global as any).Rails = Rails
