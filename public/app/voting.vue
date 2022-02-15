<template>
  <h1>Landing</h1>
  <style>
    button{
      display: block;
    }
  </style>
</template>


  <body>
  <p id="timer"></p>


  <div id="main" style="width:auto; margin:auto;display:none">

    <button id="vote-a" v-on:click="vote('a')">Vote A</button>

    <button id="vote-b" v-on:click="vote('b')">Vote B</button>

    <button v-on:click="enterCode()">Enter Valid Codes</button>

    <span>{{validCodes}}</span>
    <span>{{usedCodes}}</span>
    <div>{{voters}}</div>

    <table>
      <thead>
      <td>Vote</td>
      <td>Voters</td>
      </thead>
      <tr v-for="vote of votersT">
        <td>{{vote.vote}}</td>
        <td>{{vote.voter}}</td>
      </tr>
    </table>
    <br>
    <table>
      <thead>
      <td>Candidate A</td>
      <td>Candidate B</td>
      </thead>
      <tr v-for="index in (voters.a.length > voters.b.length ? voters.a.length : voters.b.length)" :key="index">
        <td><span>{{voters.a[index-1]}}</span></td>
        <td><span>{{voters.b[index-1]}}</span></td>
      </tr>
      <tr>
        <td><span>{{voters.a.length}}</span></td>
        <td><span>{{voters.b.length}}</span></td>
      </tr>
    </table>
  </div>


  </body>



<script>
module.exports = {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    async login() {
      const result = await this.$root.request("auth/login", [this.username, this.password]);
      debugger;
      if (result.success){
        localStorage.setItem("token", result.token);
        document.location.redirect("/#/assets");

      }

    }
  }
}
</script>
<script src="/js/vue.js"></script>
<script src="/js/vue-router.js"></script>
<script src="/js/httpVueLoader.js" crossorigin="use-credentials"></script>

<!-- promise button -->
<script type="module" src="/js/vue-promise-btn.umd.js" crossorigin="use-credentials"></script>
<link rel="stylesheet"  href="/js/vue-promise-btn.css" crossorigin="use-credentials">
<script>

// Set the date we're counting down to
let countDownDate = new Date("Feb 4, 2022 11:51:25").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "VOTE HAS STARTED";
    document.querySelector("#main").style.display="block";
  }
}, 1000);

let id;
new Vue({
  el: '#main',
  data() {
    return {
      time: "test",
      color: "red",
      isHidden: true,
      voters: {
        a: [],
        b: [],
      },
      currentVoters: "",
      votersT: ["test"],
      validCodes: []
    }
  },
  mounted: async () => {

  },
  methods: {
    async enterCode(){
      const valid_code = prompt("enter valid codes")
      await fetch("/gateway/validation/push-validation-codes", {
        method: "post",
        body:   JSON.stringify([valid_code]),
        headers: {
          "content-type": "application/json"
        }
      });

      this.validCodes = await ( await fetch("/gateway/validation/get-valid-codes", {
        method: "post"
      })).json();

      this.usedCodes = await ( await fetch("/gateway/validation/get-used-codes", {
        method: "post"
      })).json();
    },

    async vote(vote){
      const entered_code = prompt("enter code")
      this.usedCodes = await (await fetch("/gateway/validation/get-used-codes", {
        method: "post"
      })).json();
      if(this.usedCodes.includes(entered_code)){
        return 0;
      }
      else {
        if (this.validCodes.includes(entered_code)) {


        } else {
          alert("incorrect code");
          return 0;
        }
      }
      const voter = prompt("Please enter your name")
      if (voter === "") {
        alert("No input");
        return 0;
      } else if (voter) {
        // user typed something and hit OK
      } else {
        return 0;
      }

      await fetch("/gateway/voting/vote", {
        method: "post",
        body: JSON.stringify([vote, voter]),
        headers: {
          "content-type": "application/json"
        }
      });

      this.voters = await (await fetch("/gateway/voting/get-votes", {
        method: "post"
      })).json();

      this.votersT = await (await fetch("/gateway/voting/get-votes", {
        method: "post"
      })).json();

      const list = {
        a: [],
        b: []
      }


      this.voters.forEach(vote => {
        if (vote.vote === 'a') {
          list.a.push(vote.voter)
        } else {
          list.b.push(vote.voter)
        }
      })

      this.voters = list;
      console.log(list)

      await fetch("/gateway/validation/save-used-codes", {
        method: "post",
        body: JSON.stringify([entered_code]),
        headers: {
          "content-type": "application/json"
        }

      });



    },

  }
});
</script>
<template>
  <div class="main">
  <h1 class="header3">Voting</h1>

  <!-- after login as guest voting choices will be displayed here as buttons -->
    <div class="adminfont">{{votes}} - Times Clicked</div>
    <div class="container" id="buttons"></div>
  </div>
</template>

<script src="/js/voting.js"></script>
