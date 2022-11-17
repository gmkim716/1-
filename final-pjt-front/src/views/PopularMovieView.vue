<template>
  <div>
    <h3>Popular Movie</h3>
    <hr>
    <PopularList/>
    <hr>
    <RatedList/>
    <hr>
  </div>
</template>

<script>
import PopularList from '@/components/PopularList'
import RatedList from '@/components/RatedList'


export default {
  name: 'PopularMovieView',
  components: {
    PopularList,
    RatedList,
  }
}
</script>

<style>

</style>