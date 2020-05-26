<template>
  <div id="app">
    <p v-if="result">{{ result.currentUser.email }}</p>
    <p v-else>
      <a href="/users/sign_in">Sign in</a><br />
      <a href="/users/sign_up">Sign up</a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'
import { useCurrentUserQuery } from '@/graphql/types'

export default defineComponent({
  setup() {
    const { result } = useCurrentUserQuery()
    return { result }
  }
})
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
