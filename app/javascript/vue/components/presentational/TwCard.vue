<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <slot />
    </div>
  </div>
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
