<template>
  <div id="app">
    <template v-if="!loading">
      <ul
        v-if="result.currentUser"
        class="flex items-center justify-end p-6 bg-teal-500"
      >
        <li class="mr-6">
          <router-link
            to="/protected/example"
            class="text-white hover:text-yellow-800"
          >
            {{ result.currentUser.email }}
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
    </template>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'
import { useCurrentUserQuery } from '@/graphql/types'

export default defineComponent({
  setup() {
    const { result, loading } = useCurrentUserQuery()
    return { result, loading }
  }
})
</script>

<style scoped></style>
