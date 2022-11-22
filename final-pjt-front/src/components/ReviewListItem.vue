<template>
  <div class="mx-auto">
    <div class='d-flex justify-content-between'>
      <div>
        <span>평점 : {{ review.rating}}점</span> |  
        <span @click="goProfile">
          작성자 : {{ review.username }} 
          <!-- <button @click="goProfile">프로필</button> -->
        </span>
      </div>
      <div>
        <i v-if="user && review.like_users.includes(user.pk)" @click="likeReview" class="fa-solid fa-thumbs-up fa-2x"></i>
        <i v-if="user && !review.like_users.includes(user.pk)" @click="likeReview" class="fa-regular fa-thumbs-up fa-2x"></i>
        <!-- <button v-if="user && review.like_users.includes(user.pk)" @click="likeReview">좋아요 취소</button>
        <button v-if="user && !review.like_users.includes(user.pk)" @click="likeReview">좋아요</button> -->
        <span> {{review.like_users.length }} </span>
        <i v-if="user && review.hate_users.includes(user.pk)" @click="hateReview" class="fa-solid fa-thumbs-down fa-2x"></i>
        <i v-if="user && !review.hate_users.includes(user.pk)" @click="hateReview" class="fa-regular fa-thumbs-down fa-2x"></i>
        <!-- <button v-if="user && review.hate_users.includes(user.pk)" @click="hateReview">싫어요 취소</button>
        <button v-if="user && !review.hate_users.includes(user.pk)" @click="hateReview">싫어요</button> -->
        <span> {{ review.hate_users.length }} </span>
      </div>
    </div>
    <p>{{ review.content }}</p>
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
      const userPk = this.review.user
      this.$router.push({ name: 'ProfileView', params: { userPk }})
    },
    likeReview() {
      if (this.$store.state.user){
        this.$store.dispatch('likeReview', this.review.id)
      } else {
        this.$router.push({ name: 'LoginView'})
      }
    },
    hateReview() {
        if (this.$store.state.user) {
          this.$store.dispatch('hateReview', this.review.id)
        } else {
          this.$router.push({ name: 'LoginView'})
        }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
  i {
    width: 30px;
  }
  * {
    background: white;
    width: 800px;
  }
</style>