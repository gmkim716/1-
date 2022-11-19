<template>
  <div>
    <h4>ProfileView</h4>
    <p>이름 : {{ profile.username }}</p>
    <p>좋아하는 영화({{ profile.like_movies_count }} 개) : {{ profile.like_movies }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  computed: {
    profile() {
      return this.$store.getters.profile
    }
  },
  created() {
    this.$store.dispatch('getProfile', Number(this.$route.params.userPk))
  }
  
}
</script>

<style>

</style>