<template>
    <main class="container">
        <h1>Rangliste</h1>
        <div class="table-responsive col-md-6 mx-auto">
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
                        <th scope="row">{{ user.user_id }}</th>
                        <td>{{ user.name }}</td>
                        <td><b>{{ user.total_points }}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main> 
</template>

<script>

import { db } from '../firebase.js'

import { collection, getDocs, orderBy, query } from "firebase/firestore";

const querySnapshot = await getDocs(query(collection(db, "users")));
let users = querySnapshot.docs.map(doc => doc.data());
users.sort((a, b) => b.total_points - a.total_points);
users.map((user, index) => user.user_id = index + 1);

export default {
    data() {
        return {
            users
        }
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