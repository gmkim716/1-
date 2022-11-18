<template>
    <div>
        <ReviewForm/>
        <h1>ReviewList</h1>
    </div>
</template>


<script>
import ReviewForm from '@/components/ReviewForm';
export default {
    name: 'ReviewList',
    components: {
        ReviewForm,
    },
    created() {
        this.$store.dispatch('getReviews')
    }
}
</script>


<style>

</style>