<template>
  <div class="main">

    <h1>Landing</h1>
    <!-- login and setting permissions
    based on those permissions rerouting to admin.vue or voting.vue

    <div v-if="{loginPerms} === 'admin'">
      <router-link :to="{ name: 'Admin'}>Admin</router-link>
    </div>-->

<!--    <div v-if="isAdmin === true">
      router.push("Admin")
    </div>

    <div v-if="isValidVoter === true">
      <router-link :to="{name : 'Voting'}">Voting</router-link>
    </div>-->

    <button v-on:click="login()">login</button>



  </div>
</template>


<script>
module.exports = {
  data() {
    return {
      isAdmin: false,
      validCodes: [],
    }
  },
  methods: {
    async login(){
      const pwd = prompt("Enter your password: ")
      if (pwd === "" || pwd.trim() === "") {
        alert("No input");
        return 0;
      }
      else if (pwd==='1') {
        this.isAdmin = true;
        await this.$router.push({name: 'Admin'})
      }
      else if (pwd) {
        // user typed something and hit OK
        //call set function that validates AND if valid sends it to usedCodes array
        this.validCodes = await ( await fetch("/gateway/validation/get-valid-codes", {
          method: "post"
        })).json();


        if(this.validCodes.includes(pwd)) {
          console.log(this.validCodes)
          await this.$router.push({name: 'Voting'})
          this.validCodes = this.validCodes.filter(e => e !== pwd)
          console.log(this.validCodes)
        }
        else {
          console.log(this.validCodes)
          alert("Wrong code");
        }
      }
      else {
        return 0;
      }
    },
  }
}
</script>
