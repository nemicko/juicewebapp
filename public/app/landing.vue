<template>
  <div class="main">

    <h1>Landing</h1>
    <!-- login and setting permissions
    based on those permissions rerouting to admin.vue or voting.vue

    <div v-for="voting in votings" :key="voting.id">
      <router-link :to="{ name: 'voting', params: {id: voting.id}}">{{votings.name}}</router-link>
    </div>-->

    <button v-on:click="login()">login</button>
    <div>{{loginPerms}}</div>

  </div>
</template>


<script>
module.exports = {
  data() {
    return {
      loginPerms: [],
    }
  },
  methods: {
    async login(){
      const pwd = prompt("enter ur pwd")
      if (pwd === "" || pwd.trim() === "") {
        alert("No input");
        return 0;
      } else if (pwd) {
        // user typed something and hit OK
      } else {
        return 0;
      }
      await fetch("/gateway/validation/set-permissions", {
        method: "post",
        body:   JSON.stringify([pwd]),
        headers: {
          "content-type": "application/json"
        }
      });

      this.loginPerms = await ( await fetch("/gateway/validation/get-permissions", {
        method: "post"
      })).json();


    },
  }
}
</script>
