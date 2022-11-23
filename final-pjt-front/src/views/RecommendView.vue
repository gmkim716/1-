<template>
  <div>
    <h2>Recommend View</h2>
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
  },
  mounted() {
    if (this.$store.state.user) {
      this.$store.dispatch('getUserDetail', this.user.id)
    } else {
      this.$router.push({ name: 'LoginView' })
    }
  }
}
</script>

<style>

</style>