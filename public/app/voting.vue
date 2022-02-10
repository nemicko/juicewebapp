<template>
  <div class="main">
  <h1>Voting</h1>
  <!-- pojedino glasanje dinamicki id-->
  </div>
</template>

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
