<template>
  <div>
    {{ movie.title }}
  </div>
</template>

<script>
export default {
  name: 'PopularListItem',
  props: {
    movie:Object,
  }
}
</script>

<style>

</style>