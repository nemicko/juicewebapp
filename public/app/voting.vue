<template>
  <div class="main">
    <h1 class="headerfont text-center">Voting Page</h1>

  <!-- after login as guest voting choices will be displayed here as buttons -->
<!--    <div class="adminfont">{{votes}} - Times Clicked</div>-->

      <!-- router links koji getvotings, svaki ode na voting:id koji onda zove vailable votings i displaya botune-->

    <div class="container py-20 h-40 p-15 text-white text-center bg-dark bg-opacity-10 rounded-3">
      <div class="text-center" id="loginPage">
        <div class="col-md-12 col-xl-12 col-lg-12 col-sm-12 text-center bordercentertitle">
            <div v-for="vote in votings" :key="vote.id">
              <router-link id="togglevotings" style="text-decoration: none;" :to="{ name: 'vote', params: { id: vote.id }}">
                <span class="text-center font1 hyperlink">{{vote.name}}</span>
              </router-link>
            </div>
            <button class="btn btn-lg login-button" type="button" id="toggle" @click="connect()">Connect Wallet</button>
            <br>
            <button class="btn btn-lg login-button" type="button" @click="disconnect()">Disconnect Wallet</button>
            <br>
            disconnect
        </div>
      </div>
    </div>
  </div>
</template>

<script src="/js/voting.js"></script>
