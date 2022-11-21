<template>
  <div>
    <div
      v-for="result in results"
      :key="result.id"
    >
    <!-- 사진, 포스터, 개봉일, 평점, 등.. -->
      {{ result.title }} 
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