<template>
  <div>
    <h3>HomeView</h3>
    <hr>
    <h3>lastestMovie</h3>
    <h4>내용은 가져온 최신영화에서 몇개씩 끊어서 쓰기</h4>
    <hr>
    <PopularList/>
    <hr>
    <RatedList/>
    <hr>
    <UpComingList/>
    <hr>
    <CustomList/>
  </div>
</template>

<script>
// import LastestList from '@/components/LastestList'
import PopularList from '@/components/PopularList'
import UpComingList from '@/components/UpComingList'
import CustomList from '@/components/CustomList'
import RatedList from '@/components/RatedList'

export default {
  name: 'HomeView',
  components: {
    // LastestList,
    PopularList,
    UpComingList,
    CustomList,
    RatedList,
  },
  created(){
    this.getMovies()
    this.getWeatherMovies()
    this.$store.commit('RESET_DETAIL')
  },
  methods: {
    getMovies() {
      this.$store.dispatch('getMovies')
    },
    getWeatherMovies() {
      this.$store.dispatch('getWeatherMovies')
    }
  },
}
</script>

<style>

</style>