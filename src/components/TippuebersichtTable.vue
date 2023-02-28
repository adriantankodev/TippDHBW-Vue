<template>
    <div class="table-responsive">
        <table class="table text-center">
            <thead class="table-light">
                <tr>
                    <th scope="col">Heim</th>
                    <th scope="col">Gast</th>
                    <th scope="col">Ergebnis</th>
                    <th scope="col">Tipp</th>
                    <th scope="col">Punkte</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tabledata" :key="row.game_id">
                    <td class="d-none d-lg-table-cell">{{ row.home }}</td>
                    <td class="d-none d-lg-table-cell">{{ row.guest }}</td>
                    <td class="acr">{{ row.home_acr }}</td>
                    <td class="acr">{{ row.guest_acr }}</td>
                    <td>{{ row.home_result }} : {{ row.guest_result }}</td>
                    <td>{{ row.home_tipp }} : {{ row.guest_tipp }}</td>
                    <td>{{ row.points }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="text-end"><b>Spieltagspunkte:</b></td>
                    <td><b>{{ totalPoints }}</b></td>
                </tr>
            </tfoot>
        </table>
    </div>

</template>

<style>

.acr {
    display: none;
}

@media screen and (max-width: 992px) {
    .acr {
        display: table-cell;
    }
}

</style>

<script>

import { db } from '../firebase.js'
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const gamesSnapshot = await getDocs(query(collection(db, "games/2022/6"), orderBy("game_id", "asc")));
let games = gamesSnapshot.docs.map(doc => doc.data());

const resultsSnapshot = await getDocs(query(collection(db, "results/2022/6"), orderBy("game_id", "asc")));
let results = resultsSnapshot.docs.map(doc => doc.data());

let tabledata = games.map(game => {
    let result = results.find(result => result.game_id === game.game_id);
    return {
        game_id: game.game_id,
        home: game.home,
        guest: game.guest,
        home_acr: game.home_acr,
        guest_acr: game.guest_acr,
        home_result: result.home_score,
        guest_result: result.guest_score,
        home_tipp: "",
        guest_tipp: "",
        points: ""
    }
});

async function getTipps(userid) {
    const tippsSnapshot = await getDocs(query(collection(db, "tipps/2022/6/user/" + userid), orderBy("game_id", "asc")));
    let tipps = tippsSnapshot.docs.map(doc => doc.data());

    if(tipps.length === 0){
        tipps = games.map(game => {
            return {
                game_id: game.game_id,
                home_score: "",
                guest_score: ""
            }
        });
    }

    let table = tabledata.map(row => {
        let tipp = tipps.find(tipp => tipp.game_id === row.game_id);
        return {
            game_id: row.game_id,
            home: row.home,
            guest: row.guest,
            home_acr: row.home_acr,
            guest_acr: row.guest_acr,
            home_result: row.home_result,
            guest_result: row.guest_result,
            home_tipp: tipp.home_score,
            guest_tipp: tipp.guest_score,
            points: getPoints(row.home_result, row.guest_result, tipp.home_score, tipp.guest_score)
        }
    });
    return table;
}

function getPoints(home_result, guest_result, home_tipp, guest_tipp) {
    if(home_result === "" || guest_result === "" || home_tipp === "" || guest_tipp === ""){
        return "";
    }
    if(home_result === home_tipp && guest_result === guest_tipp){
        return 3;
    }
    if(home_result - guest_result === home_tipp - guest_tipp){
        return 2;
    }
    if(home_result > guest_result && home_tipp > guest_tipp){
        return 1;
    }
    if(home_result < guest_result && home_tipp < guest_tipp){
        return 1;
    }
    return 0;
}

export default {
    props: ['userid'],
    data() {
        return {
            tabledata
        }
    },
    watch: { 
        userid: function(user) { 
            
            getTipps(user).then(table => {
                this.tabledata = table;
            });

        }
    },
    computed: {
        totalPoints() {
            return this.tabledata.reduce((a, b) => a + b.points, 0);
        }
    },

}

</script>