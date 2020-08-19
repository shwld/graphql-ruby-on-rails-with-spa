import { apolloClient } from '@/graphql/apollo'
import App from '@/vue/App.vue'
import { routes } from '@/vue/config/routes'
import '@/vue/config/globalComponents'
import '@/styles/vue_application.sass'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueCompositionApi, { provide } from '@vue/composition-api'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'

const SENTRY_DSN = (window as any).SENTRY_DSN
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  })
}

Vue.use(VueApollo)
Vue.use(VueCompositionApi)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    setup() {
      provide(DefaultApolloClient, apolloClient)
      return {}
    },
    router,
    render: (h) => h(App),
  }).$mount()
  document.body.appendChild(app.$el)
})
