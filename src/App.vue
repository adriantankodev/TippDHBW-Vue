<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footbar from './components/Footbar.vue';
</script>

<template>
  
  <div class="wrap">
    <Navbar />
    <RouterView />
  </div>

  <Footbar />
</template>

<style scoped>
.wrap {
  min-height: 100vh;
}

</style>
