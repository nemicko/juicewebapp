<template>

  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <div v-for="(option, index) in options">
        {{option}} : {{votings[index]}}
      </div>
      <div>
        <pie-chart :chart-data="datacollection"></pie-chart>
        <button @click="fillData()">Update data</button>
      </div>
    </div>
    <div class="col-1"></div>
  </div>

</template>

<script src="/js/stats.js"></script>
