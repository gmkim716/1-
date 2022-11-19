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
        <!-- <router-link :to="{ name: 'ProfileView', params: { pk } }">Profile</router-link> | -->
        <button @click="profile">Profile</button>
        <button @click="logout">Logout</button>
      </span>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pk : 0,
      userPk: this.$route.params.userPk
    }
  },
  computed: {
    isLogin() { return this.$store.getters.isLogin },
  },
  beforeRouteUpdate(to, from, next) {
    this.userPk = to.params.userPk
    next()
  },
  methods: {
    logout(){
      this.$store.dispatch('logout')
    },
    profile(){
      const userPk = this.$store.getters.user.pk
      console.log('내프로필로')
      this.$router.push({ name: 'ProfileView', params: { userPk } })
      this.$store.dispatch('getProfile', Number(this.$route.params.userPk))

    }
  },

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
