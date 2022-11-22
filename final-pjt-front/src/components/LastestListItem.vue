<template>
    <div class='col-3 my-2'>
      <div class="card h-100" id='poster' @click="goDetail(movie.id)">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" alt="movie.poster_path">
      </div>
    </div>
  
</template>

<script>
export default {
  name: 'LastestListItem',
  props: {
    movie:Object,
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    }
  }
}
</script>

<style scoped>
  #itemList {
    display: inline-block;
  }
  body {
    background: yellow;
    color: green;
  }
</style>