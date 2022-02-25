<template>

  <div class="main">
    <header>
      <h1 class="text-center headerfont">Voting app</h1>
    </header>
      <div class="text-center container-fluid" id="loginPage">
          <div class="col-md-12 col-xl-12 col-lg-12 col-sm-12 min-width lowerouterborder">
            <div class="container py-20 h-15 bordercenter p-15 text-white text-center bg-dark bg-opacity-10 rounded-3">
              <input class="landinginput" type='text' name='login' id='login' placeholder="Enter Password (Admin only)" v-on:keyup.enter="login">
               <!--<button class="logintipka" id="login_button" v-on:click="login()">Admin Login</button>-->
              <button type="button" class="btn MMlogin login-button" id="MMlogin" >MetaMask Login</button>
  <!--            <div>{{userWalletAddress}}</div>-->
            </div>
          </div>
      </div>
<!--    <div id="links" style="display: none">

    </div>-->
  </div>
</template>


<script src="/js/landing.js"></script>
