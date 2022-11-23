<template>
  <div>
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <label for="username">username</label>
      <input class='form-control mx-auto' style="width:300px;" type="text" id="username" v-model="username" required> <br>

      <label for="password1">password1</label>
      <input class='form-control mx-auto' style="width:300px;" type="password" id="password1" v-model="password1" required> <br>

      <label for="password2">password2</label>
      <input class='form-control mx-auto' style="width:300px;" type="password" id="password2" v-model="password2" required> <br>

      <input class='btn btn-secondary my-5' type="submit" value="회원가입">
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

<style scoped>
  div {
    color : #969393;
  }
</style>