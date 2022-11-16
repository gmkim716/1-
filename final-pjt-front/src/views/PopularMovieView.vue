<template>
  <div>
    <h3>Popular Movie</h3>
    <hr>
    <PopularList/>
    <hr>
  </div>
</template>

<script>
import PopularList from '@/components/PopularList'

export default {
  name: 'PopularMovieView',
  components: {
    PopularList,
  }
}
</script>

<style>

</style>