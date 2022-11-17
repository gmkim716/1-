<template>
  <div>
    <h4>Rated List</h4>
    <RatedListItem
      v-for="movie in ratedMovies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import RatedListItem from '@/components/RatedListItem'

export default {
  name: 'RatedList',
  components: {
    RatedListItem
  },
  computed: {
    ratedMovies() {
      return this.$store.getters.ratedMovies
    }
  },
}
</script>

<style>

</style>