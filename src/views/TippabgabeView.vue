<template>
    <main class="container">

        <header class="d-flex flex-wrap justify-content-around align-items-center">
            <h1>Tippabgabe</h1>
            <div class="form-group col-md-4">
                <input v-model="currentMatchday" class="form-control" type="number" min="1" max="34">
            </div>
        </header>

        <TippabgabeTable :currentMatchday="this.currentMatchday" />

    </main>
</template>

<script>

import TippabgabeTable from '../components/TippabgabeTable.vue';
import { getCurrentMatchday, getMatches, submitTipp, getTipps } from '../tipp.js'


export default {
    data() {
        return {
            currentMatchday: 1,
        };
    },
    async mounted() {
        this.currentMatchday = await getCurrentMatchday();
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