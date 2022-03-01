<template>

  <div class="row">
    <div class="col-1"></div>
    <div class="col-9">
      <div v-for="(option, index) in options">
        {{option}} : {{votings[index]}}
      </div>
      <canvas id="myBarChart" style="width:100%;max-width:600px"></canvas>
      <canvas id="myPieChart" style="width:100%;max-width:400px"></canvas>

      <button @click="fillData()">Update data</button>
    </div>
    <div class="col-1"></div>
  </div>

</template>

<script src="/js/stats.js"></script>
