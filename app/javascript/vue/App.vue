<template>
  <div id="app">
    <template v-if="!loading">
      <ul
        v-if="currentUser"
        class="flex items-center justify-end p-6 bg-teal-500"
      >
        <li class="mr-6">
          <router-link to="/chat" class="text-white hover:text-yellow-800">
            {{ currentUser.email }}
          </router-link>
        </li>
        <li>
          <a href="/users/sign_out" data-method="delete">
            Sign out
          </a>
        </li>
      </ul>
      <ul v-else class="flex items-center justify-end p-6 bg-teal-500">
        <li class="mr-6">
          <a href="/users/sign_in">Sign in</a>
        </li>
        <li>
          <a href="/users/sign_up">Sign up</a>
        </li>
      </ul>
      <router-view v-if="currentUser" />
      <div v-else>Please sign in</div>
    </template>
    <div v-else>loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCurrentUser } from './hooks/currentUser'

export default defineComponent({
  setup() {
    const { currentUser, loading } = useCurrentUser()
    return { currentUser, loading }
  }
})
</script>

<style scoped></style>
