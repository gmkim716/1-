<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'HomeView' }">Home</router-link> |
      <router-link :to="{ name: 'LastestMovieView' }">Lastest</router-link> |
      <router-link :to="{ name: 'PopularMovieView' }">Popular</router-link> |
      <router-link :to="{ name: 'RecommendView' }">Recommend</router-link> |
      <router-link :to="{ name: 'UserLikeView' }">User Like</router-link> |
      <span v-if="!isLogin">
        <router-link :to="{ name: 'SignupView' }">Signup</router-link> |
        <router-link :to="{ name: 'LoginView' }">Login</router-link> |
      </span>
      <span v-if="isLogin">
        <router-link :to="{ name: 'ProfileView', params: { userId } }">Profile</router-link> |
        <button @click="logout">Logout</button>
      </span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() { return this.$store.getters.isLogin },
    userId() {return Number(this.$store.getters.user.pk)}
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    },
  },
  upd() {
    this.getUserId()
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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
