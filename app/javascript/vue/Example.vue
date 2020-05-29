<template>
  <div>
    <p>This is example page!</p>
    {{ !loading && email ? email : 'loading' }}

    <!-- <button
      class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
    >
      Action
    </button> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'
import { useCurrentUserQuery } from '@/graphql/types'

export default defineComponent({
  setup() {
    const { result, loading } = useCurrentUserQuery()
    const email = useResult(result, null, (data) => data.currentUser.email)

    // TODO: mutatioin example
    return { email, loading }
  }
})
</script>

<style scoped></style>
