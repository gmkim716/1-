<template>
  <div>
    <p>평점 : {{ review.rating}} 점</p>
    <p>작성자 : {{ review.username }}</p>
    <p>리뷰내용 : {{ review.content }}</p>
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