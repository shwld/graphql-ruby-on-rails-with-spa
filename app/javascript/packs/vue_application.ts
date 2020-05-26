import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { apolloClient } from '@/graphql/apollo'
import App from '@/vue/app.vue'
import VueCompositionApi, { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'

Vue.use(VueCompositionApi)
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    setup() {
      provide(DefaultApolloClient, apolloClient)
      return {}
    },
    apolloProvider,
    render: (h) => h(App)
  }).$mount()
  document.body.appendChild(app.$el)
})
