<template>
  <div>
    {{ movie.title }}
  </div>
</template>

<script>
export default {
  name: 'LastestListItem',
  props: {
    movie:Object,
  }
}
</script>

<style>

</style>