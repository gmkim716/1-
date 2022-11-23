<template>
  <div class="container">
    <div id='listItem' class="mx-auto">
      <div class='d-flex justify-content-between'>
        <div class='my-auto'>
          <span @click="goProfile">
            {{ review.username }} 
          </span> |
          <span>평점 : {{ review.rating}}점</span>
        </div>
        <div class='my-auto'>
          <i v-if="user && review.like_users.includes(user.pk)" @click="likeReview" class="fa-solid fa-thumbs-up fa-2x"></i>
          <i v-if="user && !review.like_users.includes(user.pk)" @click="likeReview" class="fa-regular fa-thumbs-up fa-2x"></i>
          &nbsp; <span> {{ review.like_users.length }} </span> &nbsp;
          <i v-if="user && review.hate_users.includes(user.pk)" @click="hateReview" class="fa-solid fa-thumbs-down fa-2x"></i>
          <i v-if="user && !review.hate_users.includes(user.pk)" @click="hateReview" class="fa-regular fa-thumbs-down fa-2x"></i>
          &nbsp; <span> {{ review.hate_users.length }} </span>
          &nbsp; <span>수정</span> | <span>삭제</span>
        </div>
      </div>
      <p class='mt-3' align='left'>
        {{ review.content }}
      </p>
    </div>
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
      const userPk = this.review.user
      this.$store.dispatch('getProfile',userPk),
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
    },
  }
}
</script>

<style scoped>
  i {
    width: 30px;
  }
  #listItem {
    word-break: break-all;
  }
  .container {
    background: #262626;
    width: 800px;
  }
</style>