<template>
  <div>
    <h4>Popular List</h4>
    <carousel :autoplay="false" :nav="true" :dots="true" class="marginTop50" :items: 4>
      <PopularListItem
        v-for="movie in popularMovies"
        :key="movie.id"
        :movie="movie"
      />
    </carousel>

  </div>
</template>

<script>
import PopularListItem from '@/components/PopularListItem'
import carousel from 'vue-owl-carousel'

export default {
  name: 'PopularList',
  components: {
    PopularListItem,
    carousel
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