<template>
  <input
    type="text"
    :value="value"
    @change="$emit('input', $event.target.value)"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, ctx) {
    return {}
  }
})
</script>

<style scoped></style>
