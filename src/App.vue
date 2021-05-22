<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App'
  // components: {
  //   HelloWorld
  // }
})
</script>

<style>
html, body {
  background-color: #f2f2f2;
  color: #666;
}
</style>
