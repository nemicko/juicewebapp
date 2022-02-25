<template>
  <div class="main">
    <h1 class="headerfont text-center">Voting Page</h1>

    <!-- after login as guest voting choices will be displayed here as buttons -->
    <!--    <div class="adminfont">{{votes}} - Times Clicked</div>-->
    <div class="container" id="buttons"></div>
    <div id="votes"></div>

    <div>
      <div class="container py-20 h-40 p-15 text-white text-center bg-dark bg-opacity-10 rounded-3">
        <div class="text-center">
          <div class="col-md-12 col-xl-12 col-lg-12 col-sm-12 text-center bordercentertitle">
            <button class="text-center login-button" v-promise-btn v-for="(option, index) in options" @click="vote(index)">
              {{option}} ({{results[index]}})
            </button>
            <br>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="/js/votingDetails.js"></script>
