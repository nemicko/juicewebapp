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
  <h1 class="headerfont text-center">Admin</h1>
  <div class="adminfont">{{validCodes}} - Valid Codes</div>
  <div class="adminfont">{{votingChoices}} - Valid </div>

  <div class="container py-4 h-15  p-15 text-white text-center bg-dark bg-opacity-10 rounded-3 ">

  <!-- after login, buttons to add voting choices and used codes will be displayed here

  <button class="choicestipka" v-on:click="enterVotings(2)">Enter Voting choices</button>
  <button class="codestipka" v-on:click="enterVotings(3)">Enter Voting codes</button>-->

  <form name="form">
    <div class="text-center">
      <div class="col-md-12 text-center">
        <div class="h-15  p-15 text-white text-center rounded-3 bordercentertitle ">
          <label class="font1">Enter Title
            <br>
          <input class="admininput text-center" type='text' name='title' id='title' placeholder="Title">
          </label>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
          <div class="col-md-6">
            <div class="h-15 p-15 text-white text-center rounded-3 bordercentertitle2 ">
              <label class="font1">Enter Choices
                <br>
                <input class="admininput text-center" type='text' name='choices' id='choices' placeholder="Choices">
              </label>
              <br>
              <button class="logintipka" type="button" v-on:click="addChoices()">Add Choice</button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="h-15 p-15 text-white text-center  rounded-3 bordercentertitle2">
              <label class="font1">Enter Codes
                <br>
                <input class="admininput text-center" type='text' name='codes' id='codes' placeholder="Codes">
              </label>
              <br>
              <button class="logintipka" type="button" v-on:click="addCodes()">Add Code</button>
            </div>
          </div>
    </div>

  <button class="logintipka" type="button" v-on:click="finishEntry()">Finish entry</button>
  </form>



</div>
</div>
</template>

<script src="/js/admin.js"></script>
