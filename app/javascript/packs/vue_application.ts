import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { apolloClient } from '@/graphql/apollo'
import App from '@/vue/App.vue'
import VueCompositionApi, { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import VueRouter from 'vue-router'
import { routes } from '@/vue/config/routes'
import '@/vue/config/globalComponents'
import '@/styles/vue_application.sass'

Vue.use(VueApollo)
Vue.use(VueCompositionApi)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    setup() {
      provide(DefaultApolloClient, apolloClient)
      return {}
    },
    router,
    render: (h) => h(App)
  }).$mount()
  document.body.appendChild(app.$el)
})
