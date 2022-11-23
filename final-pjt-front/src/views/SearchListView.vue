<template>
  <div>
    <div
      v-for="result in results"
      :key="result.id"
    >
    <img :src="`https://image.tmdb.org/t/p/w500/${result?.poster_path}`" class="card-img-top" style="width:100px; height:200px;" alt="#"> 
    <span>{{ result.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchListView',
  computed: {
    results() {
      return this.$store.getters.results
    },
  },
  mounted() {
    console.log(this.$route.query)
  }

}
</script>

<style>

</style>