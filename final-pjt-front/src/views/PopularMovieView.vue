<template>
  <div>
    <h2>Popular Movie</h2>
    <hr>
    <PopularList/>
    <hr>
    <RatedList/>
    <hr>
    <UpComingList/>
  </div>
</template>

<script>
import PopularList from '@/components/PopularList'
import RatedList from '@/components/RatedList'
import UpComingList from '@/components/UpComingList'


export default {
  name: 'PopularMovieView',
  components: {
    PopularList,
    RatedList,
    UpComingList,
  }
}
</script>

<style>

</style>