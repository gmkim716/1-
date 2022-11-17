<template>
  <div @click="goDetail(movie.id)">
    {{ movie.title }}
  </div>
</template>

<script>
export default {
  name: 'PopularListItem',
  props: {
    movie:Object,
  },
  m
}
</script>

<style>

</style>