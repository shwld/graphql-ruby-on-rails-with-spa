<template>
  <div><router-link to="/chat">Go to chat</router-link></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { defineComponent } from '@vue/composition-api'
import { useResult } from '@vue/apollo-composable'

export default defineComponent({
  setup(props, ctx) {
    return {}
  }
})
</script>

<style scoped></style>
