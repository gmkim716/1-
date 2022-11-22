<template>
  <div class="card" style="width: 18rem;" @click="goDetail(movie.id)"> 
    <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" class="card-img-top" alt="#"> 
    <div class="card-body">
      <h5 class="card-title">{{movie.title}}</h5>
      <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopularListItem',
  props: {
    movie:Object,
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    }
  },
  
}
</script>

<style>

</style>