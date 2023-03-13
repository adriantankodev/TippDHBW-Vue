<template>
    <main class="container">
        <h1>Rangliste</h1>
        <div class="table-responsive col-md-6 mx-auto" v-show="loaded">
            <table class="table text-center">
                <thead class="table-light">
                    <tr>
                        <th scope="col">Platzierung</th>
                        <th scope="col">Spieler</th>
                        <th scope="col">Gesamtpunkte</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.user_id">
                        <th scope="row">{{ user.rank }}</th>
                        <td>{{ user.username }}</td>
                        <td><b>{{ user.points }}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center" v-show="!loaded">
            <div class="spinner-border" role="status" v-show="!loaded">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </main>
</template>

<script>

import { getUsers } from '../tipp.js'

export default {
    data() {
        return {
            users: [],
            loaded: false
        }
    },
    async mounted() {
        this.users = await getUsers();
        this.loaded = true;
        this.users.sort((a, b) => b.points - a.points);
        this.users.map((user, index) => user.rank = index + 1);
    }
}

</script>

<style>
h1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
}
</style>