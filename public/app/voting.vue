<template>
  <div class="main">
    <h1 class="headerfont">
      Wahl Jugendversammlung
      <small>Steisslingen am Bodensee</small>
    </h1>

    <div v-if="!connected" style="text-align: center;padding: 10%;font-size: 1.2em;">
      Willkommen bei der Wahl zur Jugendversammlung,
      in Steisslingen am Bodensee am 05.03.2022.
      <br/>
      Diese wahl wird dezentral ausgeführt, basierend
      auf Blockchain Technologie. Zur teilname wird
      "MetaMask" benötigt.
    </div>

    <div v-if="connected" style="text-align: center;padding: 10%;font-size: 1.2em;">
      Bitte wählen sie die Wahl zur teilnahme aus.
    </div>

    <div class="container py-20 h-40 p-15 text-white text-center bg-dark bg-opacity-10 rounded-3">
      <div class="text-center" id="loginPage">

        <div class="col-md-12 col-xl-12 col-lg-12 col-sm-12 text-center bordercentertitle">
            <div v-for="vote in votings" :key="vote.id">
              <router-link id="togglevotings" class="linkButton" style="text-decoration: none;" :to="{ name: 'vote', params: { id: vote.id }}">
                <span class="">{{vote.name}}</span>
              </router-link>
            </div>

            <div style="color:white;" v-if="connected && votings.length == 0">Es stehen aktuell keine wahlen zur verfügung</div>
            <button v-if="!connected" class="btn btn-lg login-button" type="button" id="toggle" @click="connect()">Connect Wallet</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="/js/voting.js"></script>
