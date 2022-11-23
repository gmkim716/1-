
<template>
  <div>
    <hr>
    <form @submit.prevent="createReview" class="col col-md-7 mx-auto justify-content-between">
      <div class='d-flex justify-content-between'>
        <div class='col-md-6 d-flex my-auto'>
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
        </div>
        <button type='submit' class="btn btn-secondary">리뷰 등록</button>
      </div>
      <label for="content"></label>
      <!-- <input class='form-control' type="text" v-model.trim="content"> -->
      <textarea v-model.trim="content" class='form-control' name="" id="" cols="15" rows="5"></textarea>
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
      if (this.rating == null) {
        alert('평점을 입력해주세요')
        return
      }
      if (this.content == null) {
        alert('리뷰 내용을 입력해주세요')
        return
      }
      
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