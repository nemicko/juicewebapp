<template>
  <div class="main">
  <h1 class="header3" id="title">Voting Page</h1>

  <!-- after login as guest voting choices will be displayed here as buttons -->
<!--    <div class="adminfont">{{votes}} - Times Clicked</div>-->
    <div class="container" id="buttons"></div>
    <div id="votes"></div>

    <!-- router links koji getvotings, svaki ode na voting:id koji onda zove vailable votings i displaya botune-->
    <div v-for="vote in votings" :key="vote.id">
      <router-link :to="{ name: 'votingDetails', params: { id: vote.id }}">

        <span>{{vote.name}}</span>

      </router-link>
    </div>

  </div>
</template>

<script src="/js/voting.js"></script>
