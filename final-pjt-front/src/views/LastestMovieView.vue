<template>
  <div>
    <h3>최신 영화 목록</h3>
    <hr>
    <LastestList/>
    <hr>
  </div>
</template>

<script>
import LastestList from '@/components/LastestList'

export default {
  name: 'LastestMovieView',
  components: {
    LastestList,
  }
}
</script>

<style>

</style>