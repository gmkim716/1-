<template>
  <div @click="goDetail(movie.id)">
    {{ movie.title }}
  </div>
  
</template>

<script>
export default {
  name: 'RatedListItem',
  props: {
    movie:Object
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    }
  }
}
</script>

<style>

</style>