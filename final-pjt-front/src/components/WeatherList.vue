<template>
  <div>
    <h4>WeatherList</h4>
    <WeatherListItem/>
  </div>
</template>

<script>
import WeatherListItem from '@/components/WeatherListItem'

export default {
  name: 'WeatherList',
  components: {
    WeatherListItem
  }

}
</script>

<style>

</style>