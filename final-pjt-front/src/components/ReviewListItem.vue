<template>
  <div id='listItem' class="mx-auto">
    <div class='d-flex justify-content-between'>
      <div class='my-auto'>
        <span @click="goProfile">
          {{ review.username }} 
          <!-- <button @click="goProfile">프로필</button> -->
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
    },
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
  #listItem {
    word-break: break-all;
  }
</style>