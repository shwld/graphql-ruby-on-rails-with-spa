<template>
  <div id="app">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: function () {
    return {
      message: 'Hello Vue!'
    }
  }
})
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
