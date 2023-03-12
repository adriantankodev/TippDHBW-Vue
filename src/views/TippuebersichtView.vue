<template>
  <main class="container">

    <header class="d-flex flex-wrap justify-content-around align-items-center">
      <h1>Tippübersicht</h1>
      <div class="form-group col-md-4">
        <input v-model="currentMatchday" class="form-control" type="number" min="1" max="34">
      </div>
    </header>

    <TippuebersichtTable :current-matchday="this.currentMatchday" />

  </main>
</template>

<script setup>

import TippuebersichtTable from '../components/TippuebersichtTable.vue'

</script>

<script>

import { getCurrentMatchday, getMatches, submitTipp, getTipps } from '../tipp.js'

export default {
  data() {
    return {
      currentMatchday: 1,
    }
  },
  async mounted() {
    this.currentMatchday = await getCurrentMatchday();
  }
}

</script>

<style>
header {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

