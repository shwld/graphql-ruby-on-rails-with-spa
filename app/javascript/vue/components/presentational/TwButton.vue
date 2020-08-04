<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent, PropType } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'

export default defineComponent({
  setup(props, ctx) {
    return {}
  }
})
</script>

<style scoped></style>
