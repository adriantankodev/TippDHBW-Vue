<template>
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
                <tr v-for="match in matches" :key="match.matchId">
                    <td class="d-none d-lg-table-cell">{{ match.date }}</td>
                    <td class="d-none d-lg-table-cell">{{ match.team1 }}</td>
                    <td class="d-none d-lg-table-cell">{{ match.team2 }}</td>
                    <td class="acr">{{ match.team1short }}</td>
                    <td class="acr">{{ match.team2short }}</td>
                    <td class="d-flex flex-wrap flex-sm-nowrap justify-content-center">
                        <input v-model="match.score1" class="form-control" type="number" min="0"
                            oninput="validity.valid||(value='');" name="tipp" id="tippinput"
                            :placeholder="match.team1short.substring(0, 3)" :disabled="match.disabled">
                        <input v-model="match.score2" class="form-control" type="number" min="0"
                            oninput="validity.valid||(value='');" name="tipp" id="tippinput"
                            :placeholder="match.team2short.substring(0, 3)" :disabled="match.disabled">
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td class="d-none d-lg-table-cell"></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button @click="submitTipps(this.matches)" class="btn btn-primary" type="submit">Save</button>
                    </td>
                </tr>
            </tfoot>
        </table>
        <div class="alert alert-success" role="alert" v-show="successAlert">
            Tipps erfolgreich gespeichert!
        </div>
        <div class="alert alert-danger" role="alert" v-show="errorAlert">
            Fehler beim Speichern der Tipps!
        </div>
    </div>
</template>

<script>

import { getMatches, submitTipp, getTipps } from '../tipp.js';

async function submitTipps(matches) {

    let tipps = matches.map(match => {
        return {
            matchId: match.matchId.toString(),
            score1: match.score1.toString(),
            score2: match.score2.toString()
        }
    });
    let success = true;
    tipps.forEach(async tipp => {
        let res = await submitTipp(tipp);
        if (res.status !== 200) {
            success = false;
        }
    });
    if (success) {
        this.successAlert = true;
        setTimeout(() => {
            this.successAlert = false;
        }, 3000);
    } else {
        this.errorAlert = true;
        setTimeout(() => {
            this.errorAlert = false;
        }, 3000);
    }
};

async function getModel(matches, tipps) {
    matches.forEach(match => {

        // disable tipp input that are in the past
        if (new Date(match.date) < new Date()) {
            match.disabled = true;
        } else {
            match.disabled = false;
        }

        // format date
        match.date = new Date(match.date).getDate() + "." + (new Date(match.date).getMonth() + 1) + ". " + new Date(match.date).getHours() + ":" + new Date(match.date).getMinutes();
        let tipp;

        // set tipp if already submitted
        tipp = tipps.find(tipp => tipp.matchId === match.matchId);
        if (tipp) {
            match.score1 = tipp.score1;
            match.score2 = tipp.score2;
        } else {
            match.score1 = "";
            match.score2 = "";
        }

    });

    return matches;
}

export default {
    name: 'TippabgabeTable',
    props: ['currentMatchday'],
    data() {
        return {
            matches: [],
            tipps: [],
            successAlert: false,
            errorAlert: false,
            submitTipps
        }
    },
    async mounted() {
        this.tipps = await getTipps();
    },
    watch: {
        currentMatchday: async function (newMatchday) {
            const matches = await getMatches(newMatchday);
            this.matches = await getModel(matches, this.tipps);
        }
    },
}

</script>

<style>
#tippinput {
    display: inline-block;
    width: 75px;
    margin: 5px;
}

.acr {
    display: none;
}

@media screen and (max-width: 992px) {
    .acr {
        display: table-cell;
    }
}
</style>