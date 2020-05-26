<template>
  <div id="app">
    <template v-if="!loading">
      <ul v-if="result" class="flex items-center justify-end p-6 bg-teal-500">
        <li>
          <router-link
            to="/my_profile/edit"
            class="text-white hover:text-yellow-800"
          >
            {{ result.currentUser.email }}
          </router-link>
        </li>
      </ul>
      <ul v-else class="flex">
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
import { useCurrentUserQuery, CurrentUserQuery } from '@/graphql/types'

export default defineComponent({
  setup() {
    const { result, loading } = useCurrentUserQuery()
    return { result, loading }
  }
})
</script>

<style scoped></style>
