<template>
  <div>
    <h4>Popular List</h4>
    <PopularListItem
      v-for="movie in popularMovies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import PopularListItem from '@/components/PopularListItem'
export default {
  name: 'PopularList',
  components: {
    PopularListItem,
  },
  computed: {
    popularMovies() {
      return this.$store.getters.popularMovies
    }
  }
}
</script>

<style>

</style>