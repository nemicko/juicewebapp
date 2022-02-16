<template>

  <div class="main">
    <header>
      <h1 class="text-center">Landing</h1>
    </header>
      <div class="text-center">
        <div class="col-md-12 cen lowerouterborder">
          <div class="h-50 w-50 p-15 text-white text-center bg-dark bg-opacity-10 rounded-3 bordercenter">
            <input type='text' name='title' id='title' placeholder="Enter Password">
            <p></p>
            <button class="logintipka" v-on:click="login()">Login</button>

          </div>
        </div>
      </div>
    <!-- login and setting permissions
    based on those permissions rerouting to admin.vue or voting.vue -->
  </div>
</template>


<script src="/js/landing.js"></script>
