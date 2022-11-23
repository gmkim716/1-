<template>
  <div>
    <hr>
    <ReviewListItem
      v-for="review in reviews"
      :key="review.id"
      :review="review"
    />
  </div>
</template>


<script>
import ReviewListItem from '@/components/ReviewListItem'

export default {
    components: {
        ReviewListItem,
    },
    computed: {
        reviews() {
            return this.$store.getters.reviews
        }
    },

}
</script>


<style>
</style>