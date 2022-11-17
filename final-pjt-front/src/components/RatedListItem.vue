<template>
  <div>
    {{ movie.title }}
  </div>
  
</template>

<script>
export default {
  name: 'RatedListItem',
  props: {
    movie:Object
  }
}
</script>

<style>

</style>