<template>
  <div>
    <h4>Signup</h4>
    <form @submit.prevent="signup">
      <label for="username">username:</label>
      <input type="text" id="username" v-model="username" required> <br>

      <label for="password1">password1:</label>
      <input type="password" id="password1" v-model="password1" required> <br>

      <label for="password2">password2:</label>
      <input type="password" id="password2" v-model="password2" required> <br>

      <input type="submit" value="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupView',
  data() {
    return {
      username: null,
      password1 : null,
      password2 : null,
    }
  },
  methods: {
    // action에서 axios하면 토큰을 받아옴
    signup(){
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username, password1, password2
      }
      
      this.$store.dispatch('signup', payload)
    }
  }
}
</script>

<style>

</style>