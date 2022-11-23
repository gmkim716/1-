<template>
  <div class='col-3 my-2'>
    <div class="card" style="width: 100%;" @click="goDetail(movie.id)" > 
      <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" class="card-img-top" style="width:100%; height: 25rem;" alt="#"> 
      <div class="card-body">
        <div>
          <h5 v-if="movie.title.length <= 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie?.title }}</h5>
          <h5 v-if="movie.title.length > 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie?.title.slice(0, 13)}}..</h5>
        </div>
        <p class="card-text mb-0" style="font-size:80%;">{{movie?.release_date}}</p>
        <div class="d-flex justify-content-between align-items-center px-2">
          <div>
            <i class="fa-solid fa-star" style="color:#d63e1c"></i> <span class="card-text">{{movie?.vote_average}}</span>
          </div>
          <div>
            <i class="fa-solid fa-heart" style="color:#d63e1c"></i> <span class="card-text">{{movie?.like_users.length}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LibraryLike',
  props: {
    movie:Object
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    },
  }  
}
</script>

<style>

</style>