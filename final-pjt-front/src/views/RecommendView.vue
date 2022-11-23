<template>
  <div>
    <h2>{{ user?.username }}님을 위한 추천</h2>
    <hr>
    <CustomList 
      :user="user"
      :movies="movies"
    />
    <hr>
    <WeatherList/>
    <hr>
  </div>
</template>

<script>
import CustomList from '@/components/CustomList'
import WeatherList from '@/components/WeatherList'

export default {
  name: 'RecommendView',
  data() {
    return {
      movies: null
    }
  },
  components: {
    CustomList,
    WeatherList,
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    popularMovies() {
      return this.$store.getters.popularMovies
    },
    ratedMovies () {
      return this.$store.getters.ratedMovies
    },
    latestMovies() {
      return this.$store.getters.latestMovies
    }
  },
  mounted() {
    if (this.$store.state.user) {
      this.$store.dispatch('getUserDetail', this.user.id)
    } else {
      this.$router.push({ name: 'LoginView' })
    }
  },
  created() {
    this.movies = [
      ...this.popularMovies,
      ...this.ratedMovies,
      ...this.latestMovies
    ]
    console.log(this.movies)
  }
}
</script>

<style>

</style>