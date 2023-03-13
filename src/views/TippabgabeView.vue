<template>
    <main class="container">

        <header class="d-flex flex-wrap justify-content-around align-items-center">
      <h1>Tippabgabe</h1>
      <div class="d-flex align-items-center justify-content-center">
        <h4 style="margin: 0">Spieltag: </h4>
        <div class="input-group p-3" style="width: auto">
          <button type="button" @click="prev()" class="btn btn-outline-secondary input-group-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
          </button>
          <span class="input-group-text ">{{ currentMatchday }}</span>
          <button type="button" @click="next()" class="btn btn-outline-secondary input-group-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
            </svg>
          </button>
        </div>
      </div>
    </header>


        <TippabgabeTable :currentMatchday="this.currentMatchday" />

    </main>
</template>

<script>

import TippabgabeTable from '../components/TippabgabeTable.vue';
import { getCurrentMatchday } from '../tipp.js'

export default {
    data() {
        return {
            currentMatchday: 1,
        };
    },
    async mounted() {
        this.currentMatchday = await getCurrentMatchday();
    },
    methods: {
        next() {
            if (this.currentMatchday < 34) {
                this.currentMatchday++;
            }
        },
        prev() {
            if (this.currentMatchday > 1) {
                this.currentMatchday--;
            }
        }
    },
    components: { TippabgabeTable }
}

</script>

<style>
header {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>