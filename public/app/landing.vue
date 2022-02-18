<template>

  <div class="main">
    <header>
      <h1 class="text-center headerfont">Welcome</h1>
    </header>
      <div class="text-center" id="loginPage">
        <div class="col-md-12 cen lowerouterborder">
          <div class="h-50 w-50 p-15 text-white text-center bg-dark bg-opacity-10 rounded-3 bordercenter">
            <input class="landinginput" type='text' name='login' id='login' placeholder="Enter Password">
            <p></p>
            <button class="logintipka" id="login_button" v-on:click="login()">Login</button>

          </div>
        </div>
      </div>
    <div id="links" style="display: none">

    </div>

  </div>
</template>


<script src="/js/landing.js"></script>
