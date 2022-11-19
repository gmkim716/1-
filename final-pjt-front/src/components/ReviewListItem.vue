<template>
  <div>
    <p>평점 : {{ review.rating}} 점</p>
    <p>
      작성자 : {{ review.username }} 
      <button @click="goProfile">프로필</button>
    </p>
    <p>리뷰내용 : {{ review.content }}</p>
    <button @click="likeReview">좋아요</button>
    <!-- <button v-if="review.like_users.includes(like.pk)" @click="likeReview">좋아요 취소</button>
    <button v-if="!review.like_users.includes(like.pk)" @click="likeReview">좋아요</button>
    <span>{{review.like_users.length }}개 </span> -->
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
      // this.$store.dispatch('goProfile', this.review.user)
      const userPk = this.review.user
      this.$router.push({ name: 'ProfileView', params: { userPk }})
    },
    likeReview() {
      console.log(typeof(this.review.id))
      this.$store.dispatch('likeReview', this.review.id)
    }
  },
  // computed: {
  //   like() {
  //     return this.$store.getters.likeReview
  //   },
  // }
  
}
</script>

<style>

</style>