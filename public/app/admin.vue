<template>
  <main>
    <div class="container py-4">
      <header class="pb-3 mb-4 border-bottom">
      </header>

      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Go to</h1>
          <p class="col-md-8 fs-4"></p>
          <button class="routetipka" v-on:click="routeVoting()">Route to Voting</button>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-white bg-dark rounded-3">
            <h2>Enter Voting choices</h2>
            <button class="choicestipka" v-on:click="enterVotings(2)">Voting choices</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <h2>Enter Voting codes</h2>
            <button class="codestipka" v-on:click="enterVotings(3)">Voting codes</button>
          </div>
        </div>
      </div>

      <footer class="pt-3 mt-4 text-muted border-top">
        &copy; 2022
      </footer>
    </div>
  </main>
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