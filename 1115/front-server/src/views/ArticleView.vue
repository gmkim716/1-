<template>
  <div>
    <h3>ArticleView</h3>
    <router-link v-if="isLogin" :to="{ name: 'CreateView' }">Create Article</router-link>
    <hr>
    <ArticleList/>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'

export default {
  name: 'ArticleView',
  components: {
    ArticleList,
  },
  computed: {
    isLogin(){
      return this.$store.getters.isLogin
    }
  },
  created(){
    this.$store.dispatch('getArticles')
  },
}
</script>

<style>

</style>