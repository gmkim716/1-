<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login"> 
      <label for="username">username</label>
      <input class='form-control mx-auto' style='width:300px;' type="text" id="username" v-model="username" required> <br>

      <label for="password1">password</label>
      <input class='form-control mx-auto' style='width:300px;' type="password" id="password" v-model="password" required> <br>

      <input class='btn btn-secondary my-5' type="submit" value="로그인">
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

<style scoped>
  div { 
    color: #969393
  }
</style>