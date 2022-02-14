<template>
<div class="main">
  <h1>Admin</h1>
  <!-- after login, buttons to add voting choices and used codes will be displayed here -->

  <button v-on:click="enterVotings(2)">Enter Voting choices</button>
  <button v-on:click="enterVotings(3)">Enter Voting codes</button>

  <div>{{validCodes}}</div>

</div>
</template>

<script src="/js/admin.js"></script>
