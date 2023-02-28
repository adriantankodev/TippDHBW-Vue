<template>
  <main class="container">

    <header class="d-flex flex-wrap justify-content-around align-items-center">
      <h1>Tippübersicht</h1>
      <div class="form-group col-md-4">
        <select v-model="selected" class="form-control">
          <option disabled value="">Spieler wählen</option>
          <option v-for="user in users" :value="user.user_id" :key="user.user_id">{{ user.name }}</option>
        </select>
      </div>
    </header>

    <TippuebersichtTable :userid="selected" />

  </main>
</template>

<script setup>

import TippuebersichtTable from '../components/TippuebersichtTable.vue'
import { ref } from 'vue'
const selected = ref('')

</script>

<script>

import { db } from '../firebase.js'
import { collection, getDocs, query } from "firebase/firestore";

const querySnapshot = await getDocs(query(collection(db, "users")));
let users = querySnapshot.docs.map(doc => doc.data());

export default {
  data() {
    return {
      selected: "",
      users
    }
  }
}

</script>

<style>
header {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

