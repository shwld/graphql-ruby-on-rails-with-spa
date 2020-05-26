<template>
  <div>
    <p>This is edit page!</p>
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

<style scoped></style>
