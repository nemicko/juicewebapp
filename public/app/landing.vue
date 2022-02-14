<template>

  <div class="main">
    <h1>Landing</h1>
    <!-- login and setting permissions
    based on those permissions rerouting to admin.vue or voting.vue -->
    <button v-on:click="login()">login</button>
  </div>

</template>


<script src="/js/landing.js"></script>
