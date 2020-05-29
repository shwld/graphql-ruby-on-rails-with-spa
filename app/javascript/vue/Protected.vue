<template>
  <div>
    <p>Protected</p>
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
