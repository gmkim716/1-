<template>
  <div>
    <p>평점 : {{ review.rating}} 점</p>
    <p>
      작성자 : {{ review.username }} 
      <button @click="goProfile">프로필</button>
    </p>
    <p>리뷰내용 : {{ review.content }}</p>
    <button v-if="user && review.like_users.includes(user.pk)" @click="likeReview">좋아요 취소</button>
    <button v-if="user && !review.like_users.includes(user.pk)" @click="likeReview">좋아요</button>
    <span>{{review.like_users.length }}개 </span>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ReviewListItem',
  props: {
    review:Object,
  },
  data() {
    return {
      review_likes: 0,
    }
  },
  methods: {
    goProfile() {
      const userPk = this.review.user
      this.$router.push({ name: 'ProfileView', params: { userPk }})
    },
    likeReview() {
        this.$store.dispatch('likeReview', this.review.id)
    },
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>

<style>

</style>