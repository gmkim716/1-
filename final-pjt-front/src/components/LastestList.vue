<template>
  <div>
    <div id='itemList' class="row mx-auto">
      <LastestListItem
        v-for="movie in latestMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
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