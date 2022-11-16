<template>
  <div>
    <h3>Recommend View</h3>
    <hr>
    <CustomList/>
    <hr>
    <WeatherList/>
    <hr>
  </div>
</template>

<script>
import CustomList from '@/components/CustomList'
import WeatherList from '@/components/WeatherList'

export default {
  name: 'RecommendView',
  components: {
    CustomList,
    WeatherList,
  }
}
</script>

<style>

</style>