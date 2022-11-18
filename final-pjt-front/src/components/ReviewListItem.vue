<template>
  <div>
    <p>{{ review.id }}</p>
    <p>{{ review.rating}}</p>
    <p>{{ review.username }}</p>
    <p>{{ review.content }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ReviewListItem',
  props: {
    review:Object,
  }
}
</script>

<style>

</style>