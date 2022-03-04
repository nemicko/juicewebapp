<template>
  <div class="main">
    <h1 class="headerfont">
      Wahl Jugendversammlung
      <small>Steißlingen am Bodensee</small>
    </h1>

    <div v-if="!connected" style="text-align: center;padding: 10%;font-size: 1.2em;">
      Willkommen zur Wahl der Jugendversammlung in Steißlingen am 05.03.2022.
      Bei dieser Wahl wird ein Prototyp einer digitalen Wahl getestet. Wissenschaftlich wird der Test durch die Hochschule für öffentliche Verwaltung Kehl begleitet.
      <br/>
      Zur Teilnahme wird die App "Trust Wallet" benötigt.
    </div>

    <div v-if="connected" style="text-align: center;padding: 10%;font-size: 1.2em;">
      Bitte wähle die Wahl an der Du teilnehmen möchtest aus:
    </div>

    <div class="container py-20 h-40 p-15 text-white text-center bg-dark bg-opacity-10 rounded-3">
      <div class="text-center" id="loginPage">

        <div class="col-md-12 col-xl-12 col-lg-12 col-sm-12 text-center bordercentertitle">
            <div v-for="vote in votings" :key="vote.id">
              <router-link id="togglevotings" class="linkButton" style="text-decoration: none;" :to="{ name: 'vote', params: { id: vote.id }}">
                <span class="">{{vote.name}}</span>
              </router-link>
            </div>

            <div style="color:white;" v-if="connected && votings.length == 0">Es stehen aktuell keine Wahlen zur verfügung</div>
            <button v-if="!connected" class="btn btn-lg login-button" type="button" id="toggle" @click="connect()">Connect Wallet</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="/js/voting.js"></script>
