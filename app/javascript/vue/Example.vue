<template>
  <div>
    <p>This is example page!</p>
    {{ !loading && email ? email : 'loading' }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, watch } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'
import { useCurrentUserQuery } from '@/graphql/types'

export default defineComponent({
  setup() {
    const { result, loading } = useCurrentUserQuery()
    const email = useResult(result, null, (data) => data.currentUser.email)
    return { email, loading }
  }
})
</script>

<style scoped></style>
