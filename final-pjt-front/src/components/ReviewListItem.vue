<template>
  <div>
    <p>평점 : {{ review.rating}} 점</p>
    <p>
      작성자 : {{ review.username }} 
      <button @click="goProfile">프로필</button>
    </p>
    <p>리뷰내용 : {{ review.content }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ReviewListItem',
  props: {
    review:Object,
  },
  methods: {
    goProfile() {
      // this.$store.dispatch('goProfile', this.review.user)
      const userPk = this.review.user
      this.$router.push({ name: 'ProfileView', params: { userPk }})
    }
  }
}
</script>

<style>

</style>