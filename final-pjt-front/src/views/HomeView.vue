<template>
  <div>
    <h3>HomeView</h3>
    <hr>
    <LastestList/>
    <hr>
    <PopularList/>
    <hr>
    <WeatherList/>
    <hr>
    <CustomList/>
  </div>
</template>

<script>
import LastestList from '@/components/LastestList'
import PopularList from '@/components/PopularList'
import WeatherList from '@/components/WeatherList'
import CustomList from '@/components/CustomList'

export default {
  name: 'HomeView',
  components: {
    LastestList,
    PopularList,
    WeatherList,
    CustomList,
  }  
}
</script>

<style>

</style>