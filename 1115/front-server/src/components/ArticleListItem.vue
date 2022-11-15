<template>
  <div>
    <p>id : {{ article.id }}</p>
    <p>title : 
      <router-link :to="{ name: 'DetailView', params: { id: article.id } }"> 
        {{ article.title }} 
      </router-link>
    </p>
    <p>content : {{ article.content }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'ArticleListItem',
  props: {
    article:Object
  }
}
</script>

<style>

</style>