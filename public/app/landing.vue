<template>
  <div class="main">

    <h1>Landing</h1>
    <!-- popis svih glasanja

    <div v-for="voting in votings" :key="voting.id">
      <router-link :to="{ name: 'voting', params: {id: voting.id}}">{{votings.name}}</router-link>
    </div>-->

    <button v-on:click="login()">login</button>
    <div>{{logins}}</div>

  </div>
</template>


<script>
module.exports = {
  data() {
    return {
      logins: [],
    }
  },
  methods: {
    async login(){
      const pwd = prompt("enter ur pwd")
      await fetch("/gateway/login/set-permissions", {
        method: "post",
        body:   JSON.stringify([pwd]),
        headers: {
          "content-type": "application/json"
        }
      });

      this.logins = await ( await fetch("/gateway/login/get-permissions", {
        method: "post"
      })).json();


    },
  }
}
</script>
