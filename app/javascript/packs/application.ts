import '@/styles/application.sass'
import Rails from '@rails/ujs'
import ActiveStorage from '@rails/activestorage'

Rails.start()
ActiveStorage.start()
;(global as any).Rails = Rails
