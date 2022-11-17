<template>
  <div>
    <h4>WeatherList</h4>
    <WeatherListItem
      v-for="movie in weatherMovies"
      :key="movie.id"
      :movie="movie"      
    />
  </div>
</template>

<script>
import WeatherListItem from '@/components/WeatherListItem'

export default {
  name: 'WeatherList',
  components: {
    WeatherListItem
  },
  computed: {
    weatherMovies() {
      return this.$store.getters.weatherMovies
    }
  },
}
</script>

<style>

</style>