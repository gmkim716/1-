<template>
  <div>
    <h4>ProfileView</h4>
    <p>{{ user.username }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
  
}
</script>

<style>

</style>