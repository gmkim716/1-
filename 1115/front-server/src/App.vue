<template>
  <div id="app">
    <!-- nav 부분도 components로 가능 -->
    <nav>
      <router-link :to="{ name: 'ArticleView' }">Articles</router-link> | 
      <div v-if="!isLogin">
        <router-link :to="{ name: 'SignupView' }">Signup</router-link> |
        <router-link :to="{ name: 'LoginView' }">Login</router-link> |
      </div>
      <div v-if="isLogin">
        <button @click="logout">Logout</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() { return this.$store.getters.isLogin }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
