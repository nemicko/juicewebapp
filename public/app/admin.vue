<template>
<div class="main">
  <h1 class="header2">Admin</h1>
  <!-- after login, buttons to add voting choices and used codes will be displayed here -->

  <button class="choicestipka" v-on:click="enterVotings(2)">Enter Voting choices</button>
  <button class="codestipka" v-on:click="enterVotings(3)">Enter Voting codes</button>

  <div class="adminfont">{{validCodes}} - Valid Codes</div>
  <div class="adminfont">{{votingChoices}} - Valid Choices</div>

  <button class="routetipka" v-on:click="routeVoting()">Route to Voting</button>


</div>
</template>

<script src="/js/admin.js"></script>