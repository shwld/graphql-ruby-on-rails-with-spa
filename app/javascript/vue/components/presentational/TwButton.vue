<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(props, ctx) {
    return {}
  }
})
</script>

<style scoped></style>
