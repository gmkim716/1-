<template>
  <div id="app" >
    <div class="container">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <a class="navbar-brand" href="#">MUSSAF</a>

      <div class="d-flex justify-content-between collapse navbar-collapse">
        <div id='navbar-left' class="col col-md-6">
          <ul class="d-flex justify-content-between navbar-nav">
            <li class="nav-item nav-link"><router-link :to="{ name: 'HomeView' }">Home</router-link></li>
            <li class="nav-item nav-link"><router-link :to="{ name: 'LastestMovieView' }">Lastest</router-link></li>
            <li class="nav-item nav-link"><router-link :to="{ name: 'PopularMovieView' }">Popular</router-link></li>
            <li class="nav-item nav-link"><router-link :to="{ name: 'RecommendView' }">Recommend</router-link></li>
            <li class="nav-item nav-link"><router-link :to="{ name: 'UserLikeView' }">User Like</router-link></li>
          </ul>
        </div>
        <div id="navbar-right" class="col col-md-6">
          <div v-if="!isLogin" >
            <ul class="d-flex justify-content-end navbar-nav">
              <li class="my-auto"><SearchBar/></li>
              <li class="nav-item nav-link"><router-link :to="{ name: 'LoginView' }">Login</router-link></li>
              <li class="nav-item nav-link"><router-link :to="{ name: 'SignupView' }">Signup</router-link></li>
            </ul>
          </div>
          <div v-if="isLogin">
            <ul class="d-flex justify-content-end navbar-nav">
              <li v-if="user" class="nav-link false">{{ user }}님</li>
              <li class="my-auto"><SearchBar/></li> 
              <!-- <router-link :to="{ name: 'ProfileView', params: { pk } }">Profile</router-link> | -->
              <!-- <li class="nav-item nav-link"><router-link :to="{ name: 'ProfileView', params:{ userPk } }">My Page</router-link></li> -->
              <li class="nav-item nav-link" @click="profile">Profile</li>
              <li class="nav-item nav-link" @click="logout">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      pk : 0,
      userPk: this.$route.params.userPk,
      user: null,
      inputText: '',
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
    username() {
      this.user = this.$store.getters.user.username
    },
    logout(){
      this.$store.dispatch('logout')
    },
    profile(){
      const userPk = this.$store.getters.user.pk
      // this.$store.dispatch('getProfile', Number(this.$route.params.userPk))
      this.$router.push({ name: 'ProfileView', params: { userPk } })
    },
  },
  mounted(){
    this.username()
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
  background: d2d2d2;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container { 
  background: #02142b ;
}

.nav-item {
  color: #2c3e50;
  text-decoration: underline;
  font-weight: bold;
}

body {
  background: #262626;
  color: d2d2d2;
}
</style>
