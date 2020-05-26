<template>
  <div id="app">
    <template v-if="!loading">
      <div v-if="result">
        {{ result.currentUser.email }}<br />
        <router-link to="/my_profile/edit">Edit</router-link>
      </div>
      <div v-else>
        <a href="/users/sign_in">Sign in</a><br />
        <a href="/users/sign_up">Sign up</a><br />
      </div>
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
