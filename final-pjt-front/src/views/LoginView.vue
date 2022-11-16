<template>
  <div>
    <h4>Login</h4>
    <form @submit.prevent="login">
      <label for="username">username:</label>
      <input type="text" id="username" v-model="username" required> <br>

      <label for="password1">password:</label>
      <input type="password" id="password" v-model="password" required> <br>

      <input type="submit" value="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: null,
      password : null,
    }
  },
  methods: {
    // action에서 axios하면 토큰을 받아옴
    login(){
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }
      
      this.$store.dispatch('login', payload)
    }
  }
}
</script>

<style>

</style>