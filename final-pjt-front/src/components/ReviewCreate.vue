<template>
    <div>
  <h2>ReviewCreate</h2>
        <form @submit.prevent="createReview">
      <label for="points">별점: </label>
      <input type="text" id="points" v-model="points">
      <label for="review">리뷰 내용: </label>
      <textarea id="review" cols="30" rows="10" v-model="review"></textarea>
      <input type="submit" value="리뷰등록">
    </form>
    </div>
</template>


<script>
export default {
  data() {
    return {
      points: null,
      review: null,
    }
  },
  methods: {
        get_user() {
            this.user = this.$store.state.user
        },
    createReview() {
      const payload = {
        points : this.points,
        review : this.review,
      }
      this.$store.dispatch('createReview', payload)
    }
    },
    created(){
        this.get_user()
    }
}
</script>

<style>

</style>

