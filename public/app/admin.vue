<template>
  <!--<main>
    <div class="container py-4">
      <header class="pb-3 mb-4 border-bottom">
        <div class="adminfont">{{validCodes}} - Valid Codes</div>
        <div class="adminfont">{{votingChoices}} - Valid <Choices></Choices></div>
      </header>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-white text-center bg-dark rounded-3">
            <h2 class="adminfont">Enter Voting choices</h2>
            <button class="choicestipka" v-on:click="enterVotings(2)">Voting choices</button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 text-white text-center bg-dark border rounded-3">
            <h2 class="adminfont">Enter Voting codes</h2>
            <button class="codestipka" v-on:click="enterVotings(3)">Voting codes</button>
          </div>
        </div>
      </div>
      <p></p>

      <div class="col-md-12">
        <div class="h-15 p-5 text-white text-center text bg-dark border rounded-3">
          <h1 class="adminfont">Go To</h1>
          <button class="codestipka" v-on:click="routeLanding()">Route to Landing</button>
          <button class="codestipka" v-on:click="routeVoting()">Route to Voting</button>

        </div>
      </div>

      <footer class="pt-3 mt-4 text-muted border-top">
        &copy; 2022
      </footer>
    </div>


  </main> -->
<div class="main">
  <h1 class="header2">Admin</h1>
  <!-- after login, buttons to add voting choices and used codes will be displayed here

  <button class="choicestipka" v-on:click="enterVotings(2)">Enter Voting choices</button>
  <button class="codestipka" v-on:click="enterVotings(3)">Enter Voting codes</button>-->
<form name="form">
  <label>Title:
    <input type='text' name='title' id='title' placeholder="Vote Title">
  </label>
  <br>
  <br>

  <label>Choices
    <input type='text' name='choices' id='choices' placeholder="Choices">
  </label>
  <button type="button" v-on:click="addChoices()">Add Choice</button>
  <br>
  <br>

  <label>Codes:
    <input type='text' name='codes' id='codes' placeholder="Codes" >
  </label>
  <button type="button" v-on:click="addCodes()">Add Code</button>  <br>
  <br>

  <button type="button" v-on:click="finishEntry()">Finish entry</button>
  </form>

  <div class="adminfont">{{validCodes}} - Valid Codes</div>
  <div class="adminfont">{{votingChoices}} - Valid Choices</div>


</div>
</template>

<script src="/js/admin.js"></script>
