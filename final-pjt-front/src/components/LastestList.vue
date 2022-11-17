<template>
  <div>
    <h4>Lastest List</h4>
    <LastestListItem
      v-for="movie in latestMovies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import LastestListItem from '@/components/LastestListItem'

export default {
  name: 'LastestList',
  components: {
    LastestListItem,
  },
  computed: {
    latestMovies() {
      return this.$store.getters.latestMovies
    }
  },
  
}
</script>

<style>

</style>