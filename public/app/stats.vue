<template>
  <div class="main">
  <h1 class="headerfont">
    Wahl Jugendversammlung
    <small>Steisslingen am Bodensee</small>
  </h1>


  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <div v-for="(option, index) in options">
        {{option}} : {{votings[index]}}
      </div>
      <div>
        <apexchart  type="bar" :options="optionsChart" :series="series"></apexchart>
        <button @click="fillData()">Update data</button>
      </div>
    </div>
    <div class="col-1"></div>
  </div>
  </div>
</template>

<script src="/js/stats.js"></script>
