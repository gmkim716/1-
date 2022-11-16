<template>
  <div>
    <h3>Lastest Movie</h3>
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