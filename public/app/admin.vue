<template>
<div class="main">
  <h1>admin</h1>
  <!-- after login buttons to ad voting choices and used codes will be displayed here -->

  <button v-on:click="enterVotings(1)">Enter Voting title</button>
  <button v-on:click="enterVotings(3)">Enter Voting choices</button>
  <button v-on:click="enterVotings(4)">Enter Voting codes</button>

  <div>{{votings}}</div>

</div>
</template>

<script>
module.exports = {
  data() {
    return {
      validCodes: [],
      choices: []

    }
  },
  methods: {
    async enterVotings(id){
      if (id === '1'){const votingName = prompt("enter voting title")}
        else if (id === '2'){const votingName = prompt("enter voting title")}
          else if (id === '3'){const votingId = prompt("enter id of voting")}
            else if (id === '4'){const votingChoices = prompt("enter voting choices")}

      await fetch("/gateway/validation/push-votings", {
        method: "post",
        body:   JSON.stringify([votingName, votingId, votingChoices, validCodes]),
        headers: {
          "content-type": "application/json"
        }
      });

      this.votings = await ( await fetch("/gateway/validation/get-votings", {
        method: "post"
      })).json();
    },

  }
}
</script>
