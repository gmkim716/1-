
<template>
  <div>
    <form @submit.prevent="createReview">
      <p><label for="points">별점: </label>
      <star-rating 
        id=setstar 
        :star-size="30" 
        v-model.trim="rating" 
        :border-width="5" 
        border-color="#d8d8d8" 
        :rounded-corners="true"
        :inline="true"
      >
      </star-rating>
      </p>
      <label for="content"></label>
      <textarea id="content" cols="30" rows="10" v-model.trim="content"></textarea>
      <p>
        <input type="submit" value="리뷰등록">
      </p>
    </form>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  data() {
    return {
      rating: null,
      content: null,
    }
  },
  components: {
    StarRating,
  },
  methods: {
    get_user() {
        this.user = this.$store.state.user
    },
    createReview() {
      const payload = {
        rating : this.rating,
        content : this.content,
        pk: Number(this.$route.params.id)
      }
      if (this.$store.state.user) {
        this.$store.dispatch('createReview', payload)
        this.rating = null
        this.content = null
      } else {
        this.$router.push({ name: 'LoginView'})

      }
    },
  },
  created(){
    this.get_user()
  }
}
</script>
<style>

</style>