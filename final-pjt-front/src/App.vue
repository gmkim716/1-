<template>
  <div id="app" >
    <div class="container">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>

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
        <div id="navbar-right" class="col col-md-4">
          <div v-if="!isLogin" >
            <ul class="d-flex navbar-nav">
                <SearchBar/>
              <li class="nav-item nav-link"><router-link :to="{ name: 'LoginView' }">Login</router-link></li>
              <li class="nav-item nav-link"><router-link :to="{ name: 'SignupView' }">Signup</router-link></li>
            </ul>
          </div>
          <div v-if="isLogin">
            <!-- <router-link :to="{ name: 'ProfileView', params: { pk } }">Profile</router-link> | -->
            <i @click="profile" class="fa-solid fa-user fa-2x"></i>
            <!-- <button @click="profile">Profile</button> -->
            <button @click="logout">Logout</button>
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
    logout(){
      this.$store.dispatch('logout')
    },
    profile(){
      const userPk = this.$store.getters.user.pk
      // this.$store.dispatch('getProfile', Number(this.$route.params.userPk))
      this.$router.push({ name: 'ProfileView', params: { userPk } })
    },
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

.container { 
  background: rgb(193, 194, 196);
}

</style>
