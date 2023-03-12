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
                <tr v-for="match in matches" :key="match.matchId">
                    <td class="d-none d-lg-table-cell">{{ match.team1 }}</td>
                    <td class="d-none d-lg-table-cell">{{ match.team2 }}</td>
                    <td class="acr">{{ match.team1short }}</td>
                    <td class="acr">{{ match.team2short }}</td>
                    <td>{{ match.score1 }} : {{ match.score2 }}</td>
                    <td>{{ match.tipp1 }} : {{ match.tipp2 }}</td>
                    <td>{{ match.points }}</td>
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

<script>

import { getMatches, getTipps } from '../tipp.js'

function getPoints(score1, score2, tipp1, tipp2) {
    if (score1 === "" || score2 === "" || tipp1 === "" || tipp2 === "") {
        return 0;
    }
    if (score1 === tipp1 && score2 === tipp2) {
        return 3;
    }
    if (score1 - score2 === tipp1 - tipp2) {
        return 2;
    }
    if (score1 > score2 && tipp1 > tipp2) {
        return 1;
    }
    if (score1 < score2 && tipp1 < tipp2) {
        return 1;
    }
    return 0;
}

async function getModel(matches, tipps) {
    matches.forEach(match => {

        // format date
        match.date = new Date(match.date).getDate() + "." + (new Date(match.date).getMonth() + 1) + ". " + new Date(match.date).getHours() + ":" + new Date(match.date).getMinutes();

        // get tipp
        let tipp = tipps.find(tipp => tipp.matchId === match.matchId);
        if (tipp) {
            match.tipp1 = tipp.score1;
            match.tipp2 = tipp.score2;
        } else {
            match.tipp1 = "";
            match.tipp2 = "";
        }

        // calculate points
        match.points = getPoints(match.score1, match.score2, match.tipp1, match.tipp2);

    });
    return matches;
}

export default {
    name: "TippuebersichtTable",
    props: ['currentMatchday'],
    data() {
        return {
            matches: [],
            tipps: [],
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
    computed: {
        totalPoints() {
            return this.matches.reduce((a, b) => a + b.points, 0);
        }
    },
}

</script>

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