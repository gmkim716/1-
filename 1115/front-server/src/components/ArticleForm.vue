<template>
  <div>
    <form @submit.prevent="createArticle">
      <label for="title">title: </label>
      <input type="text" id="title" v-model="title"> <br>

      <label for="content">content: </label>
      <textarea id="content" cols="30" rows="10" v-model="content"></textarea> <br>

      <input type="submit">
    </form>
  </div>
</template>

<script>
export default {
  name: 'ArticleForm',
  data(){
    return {
      title: null,
      content: null,
    }
  },
  methods: {
    createArticle() {
      const payload = {
        title : this.title,
        content: this.content,
      }
      this.$store.dispatch('createArticle', payload)
    }
  }
}
</script>

<style>

</style>