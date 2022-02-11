<template>
  <div class="main">

    <h1>Landing</h1>
    <!-- login and setting permissions
    based on those permissions rerouting to admin.vue or voting.vue

    <div v-if="{loginPerms} === 'admin'">
      <router-link :to="{ name: 'Admin'}>Admin</router-link>
    </div>-->

    <div v-if="isAdmin === true">
      <router-link :to="{name : 'Admin'}">Admin</router-link>
    </div>

    <button v-on:click="login()">login</button>

    <div>{{ loginPerms }}</div>


  </div>
</template>


<script>
module.exports = {
  data() {
    return {
      loginPerms: [],
      isAdmin: false,
    }
  },
  methods: {
    async login(){
      const pwd = prompt("Enter your password: ")
      if (pwd === "" || pwd.trim() === "") {
        alert("No input");
        return 0;
      } else if (pwd==='1') {
        // reroute to admin.vue
        this.isAdmin = true;
      }
      else if (pwd) {
        // user typed something and hit OK
      }else {
        return 0;
      }

      await fetch("/gateway/validation/set-permissions", {
        method: "post",
        body:   JSON.stringify([pwd]),
        headers: {
          "content-type": "application/json"
        }
      });

      this.loginPerms = await ( await fetch("/gateway/validation/get-permissions", {
        method: "post"
      })).json();


    },
  }
}
</script>
