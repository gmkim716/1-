<template>
  <div>
    <h4>Detail View</h4>
    <p>id : {{ article?.id }}</p>
    <p>작성자 : {{ article?.username }}</p>
    <p>제목 : {{ article?.title }}</p>
    <p>내용 : {{ article?.content }}</p>
    <hr>
    <div v-if="isAuthor">
      <router-link :to="{ name: 'ArticleView'}">Update</router-link>
      <button>Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailView',
  created(){
    // route 유의
    const articleId = this.$route.params.id
    
    this.$store.dispatch('getArticleDetail', articleId)
  },
  computed: {
    article() {
      return this.$store.getters.article
    },
    isAuthor() {
      return this.$store.getters.isAuthor
    }
  }

}
</script>

<style>

</style>