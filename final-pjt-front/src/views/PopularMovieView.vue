<template>
  <div>
    <div>
      <button @click="selectPopular" :class="{'clicked': popular}">인기순</button>
      <button @click="selectRate" :class="{'clicked': rate}">평점순</button>
    </div>
    <div id='itemList' v-show="this.popular">
      <h3>인기순</h3>
      <div class="row mx-auto" >
        <div class='col-3 my-2' v-for="movie in popularMovies.slice(0, 4*page)" :key="movie.id" :movie="movie">
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
      </div>
      <button @click="add" v-if="4*page < popularMovies?.length">더보기</button>
    </div>
    <div id='itemList' v-show="this.rate">
      <h3>평점순</h3>
      <div class="row mx-auto" >
        <div class='col-3 my-2' v-for="movie in ratedMovies.slice(0, 4*page)" :key="movie.id" :movie="movie">
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
      </div>
      <button @click="add" v-if="4*page < ratedMovies?.length">더보기</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PopularList',
  data() {
    return {
      page:3,
      popular: true,
      rate: false,
    }
  },
  computed: {
    popularMovies() {
      return this.$store.getters.popularMovies
    },
    ratedMovies() {
      return this.$store.getters.ratedMovies
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    },
    selectPopular(){
      this.popular = true,
      this.rate = false,
      this.page = 3    
    },
    selectRate(){
      this.popular = false,
      this.rate = true
      this.page = 3
    },
    add(){
      this.page += 3
    } 
  },
}
</script>

<style >
.button {
  border-radius: 30%;
  background-color: white;
}
.clicked {
  background-color: grey;
}
</style>