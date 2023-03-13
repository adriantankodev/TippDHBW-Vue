<template>
  <div class="table">
  </div>
  <div class="table-responsive container table-bordered">
    <img src="https://www.bundesliga.com/assets/logo/bundesliga_pos.svg" class="Buli" />
    <table class="table table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">Platzierung</th>
          <th class="logo" scope="col"></th>
          <th scope="col">Verein</th>
          <th class="spiele" scope="col">Spiele</th>
          <th class="differenz" scope="col">Tordifferenz</th>
          <th class="points" scope="col">Punkte</th>
        </tr>
      </thead>
      <tbody class="table-light">
        <tr v-for="team in table" :key="team.Standing" class="table">
          <th class="place" scope="row">{{ team.teamStanding }}</th>
          <td class="logo"><img :src="team.teamIconUrl" height="30"></td>
          <td>{{ team.teamName }}</td>
          <td class="spiele">{{ team.teamMatches }}</td>
          <td class="differenz">{{ team.teamGoalDifference }}</td>
          <td class="points">{{ team.teamPoints }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>

export default {
  name: 'TableView',
  data() {
    return {
      table: []
    }
  },
  methods: {
    async getTable() {
      let response = await fetch('http://localhost:3000/api/table');
      let data = await response.json();
      this.table = data;
    }
  },
  mounted() {
    this.getTable();
  }
}

</script>
  
<style>
h1 {
  text-align: center;
}

tr {
  height: 40px;
}


@media screen and (max-width: 575px) {

  .spiele {
    display: none;
  }

  @media screen and (max-width: 450px) {

    .differenz {
      display: none;
    }

  }
}

.differenz,
.spiele,
.points {
  text-align: center;
}

.logo {
  width: auto;
  padding: 0;
  margin: 0;
}

.buli {
  orientation: center;

}
</style>

