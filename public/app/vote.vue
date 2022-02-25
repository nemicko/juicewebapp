<template>
  <div class="main">
    <h1 class="header3" id="title">Voting Page</h1>

    <!-- after login as guest voting choices will be displayed here as buttons -->
    <!--    <div class="adminfont">{{votes}} - Times Clicked</div>-->
    <div class="container" id="buttons"></div>
    <div id="votes"></div>

    <div>
      <button v-promise-btn v-for="(option, index) in options" @click="vote(index)">
        {{option}} ({{results[index]}})
      </button>
    </div>

  </div>
</template>

<script src="/js/votingDetails.js"></script>
