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
  data() {
    return {
      data: '어떤 데이터',
    }
  },
  computed: {
    results() {
      return this.$store.getters.results
    },
  },
  methods: {

  },

}
</script>

<style>

</style>