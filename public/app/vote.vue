<template>
  <div class="main">
    <h1 class="headerfont">
      Wahl Jugendversammlung
      <small>Steisslingen am Bodensee</small>
    </h1>

    <div style="text-align: center;padding: 10%;font-size: 1.2em;">
      Bitte gib Deine Stimme über den Button ab. Wiederhole den Vorgang bis Du alle Stimmen verteilt hast.
      Du hast noch <span style="font-weight: bold;">({{votesLeft}})</span> Stimmen abzugeben.
    </div>

    <div id="votes"></div>

    <div class="container py-20 h-40 p-15 text-white text-center bg-dark bg-opacity-10 rounded-3">
      <div class="col-md-12 col-xl-12 col-lg-12 col-sm-12 text-center bordercentertitle">
        <button class="text-center voteButton" v-promise-btn v-for="(option, index) in options" @click="vote(index)">
          <div class="row">
              <div class="col-8">
                {{option}}
              </div>
              <div class="col-2">
                <span class="badge bg-secondary">{{results[index]}}</span>
              </div>
          </div>

        </button>
      </div>
    </div>

    <!--
    <div style="position:absolute;bottom: 50px;margin: 0 auto;width: 100%;text-align: center;">
      <button style="display:inline-block">BACK</button>
    </div>
    -->

  </div>
</template>

<script src="/js/votingDetails.js"></script>
