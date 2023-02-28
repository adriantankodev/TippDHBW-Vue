<template>
    <main class="container">

        <header class="d-flex flex-wrap justify-content-around align-items-center">
            <h1>Tippabgabe</h1>
            <div class="form-group col-md-4">
                <select v-model="selected" class="form-control">
                    <option disabled value="">Spieler wählen</option>
                    <option v-for="user in users" :value="user.user_id" :key="user.user_id">{{ user.name }}</option>
                </select>
            </div>
        </header>
        

        <div class="table-responsive">
            <table class="table align-middle text-center">
                <thead class="table-light">
                    <tr>
                        <th class="d-none d-lg-table-cell" scope="col">Datum</th>
                        <th scope="col">Heim</th>
                        <th scope="col">Gast</th>
                        <th scope="col">Tipp</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="game in games" :key="game.game_id">
                        <td class="d-none d-lg-table-cell">{{ game.timestamp.getDate() }}.{{ game.timestamp.getMonth() +
                                1
                        }}. - {{ game.timestamp.getHours() }}:{{ game.timestamp.getMinutes() }} Uhr</td>
                        <td>{{ game.home }}</td>
                        <td>{{ game.guest }}</td>
                        <td class="d-flex flex-wrap flex-sm-nowrap justify-content-center">
                            <input v-model="game.home_score" class="form-control" type="number" min="0" oninput="validity.valid||(value='');" name="tipp"
                                id="tippinput" :placeholder="game.home_acr" :disabled="selected === ''">
                            <input v-model="game.guest_score" class="form-control" type="number" min="0" oninput="validity.valid||(value='');" name="tipp"
                                id="tippinput" :placeholder="game.guest_acr" :disabled="selected === ''">
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="d-none d-lg-table-cell"></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button @click="submitTipps(selected)" :disabled="selected === ''" class="btn btn-primary"
                                type="submit">Save</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </main>
</template>

<script>

import { db } from '../firebase.js'

import { doc, collection, getDocs, setDoc, orderBy, query } from "firebase/firestore";


const querySnapshot = await getDocs(query(collection(db, "users")));
let users = querySnapshot.docs.map(doc => doc.data());

const gamesSnapshot = await getDocs(query(collection(db, "games/2022/6"), orderBy("game_id", "asc")));
let games = gamesSnapshot.docs.map(doc => doc.data());

games.forEach(game => {
    game.timestamp = new Date(game.timestamp.seconds * 1000)
});

games = games.map(game => {
    return {
        game_id: game.game_id,
        home: game.home,
        guest: game.guest,
        home_acr: game.home_acr,
        guest_acr: game.guest_acr,
        home_score: "",
        guest_score: "",
        timestamp: game.timestamp
    }
});

async function submitTipps(userid) {
    let tipps = games.map(game => {
        return {
            game_id: game.game_id,
            home_score: game.home_score,
            guest_score: game.guest_score
        }
    });
    tipps.forEach(async tipp => {
        await setDoc(doc(db, "tipps/2022/6/user/" + userid, tipp.game_id.toString()), tipp);
    });
    alert("Tipps gespeichert");
}

export default {
    data() {
        return {
            games,
            users,
            selected: "",
            submitTipps
        }
    },
    watch: {
        selected: async function (userid) {
            let tippsSnapshot = [];
            let tipps = [];

            tippsSnapshot = await getDocs(query(collection(db, "tipps/2022/6/user/" + userid), orderBy("game_id", "asc")));
            tipps = tippsSnapshot.docs.map(doc => doc.data());

            if(tipps.length === 0){
                tipps = this.games.map(game => {
                    return {
                        game_id: game.game_id,
                        home_score: "",
                        guest_score: ""
                    }
                });
            }

            this.games.map(game => {
                let tipp = tipps.find(tipp => tipp.game_id === game.game_id);
                if (tipp) {
                    game.home_score = tipp.home_score;
                    game.guest_score = tipp.guest_score;
                }
            });
        }
    }
}

</script>
    
<style>

header {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

#playerSelector {
    display: flex;
}

#tippinput {
    display: inline-block;
    width: 75px;
    margin: 5px;
}
</style>