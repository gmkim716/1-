<template>
  <div>
    <div class='col-md-3 my-4' style='background-color:#D4964A'>
      <h3>CustomList</h3>
    </div>
      <div>
      <button @click="selectGenre" :class="{'clicked': genre}">장르별 추천</button>
      <button @click="selectActor" :class="{'clicked': actor}">배우별 추천</button>
    </div>
    <div id='itemList' v-show="this.genre">
      <h3>~~~님이 좋아하는 장르로 추천</h3>
      <div class="row mx-auto" >
        <div class='col-3 my-2' v-for="movie in likeGenreMovies?.slice(0,4*page)" :key="movie.id" >
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
      <button @click="add" v-if="4*page < likeGenreMovies?.length">더보기</button>
    </div>
    
    <div id='itemList' v-show="this.actor">
      <h3>~~~님이 좋아하는 배우로 추천</h3>
      <div class="row mx-auto" >
        <div class='col-3 my-2' v-for="movie in likeActorMovies?.slice(0, 4*page)" :key="movie.id" >
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
      <button @click="add" v-if="4*page < likeActorMovies?.length">더보기</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'CustomList',
  props: {
    user:Object,
    movies:Array,
  },
  data() {
    return {
      page: 3,
      likeGenres: null,
      likeActors: null,
      likeGenreMovies: null,
      likeActorMovies: null,
      genre:true,
      actor:false,
      recommends: [],
      swiperOption: { 
        slidesPerView: 4, 
        spaceBetween: 30,
        slidesPerGroup: 4,
        loop: true, 
        loopFillGroupWithBlank: true,
        pagination: { 
          el: '.swiper-pagination', 
          clickable: true 
        }, 
        navigation: { 
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev' 
        } 
      },
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    },
    add(){
      this.page += 3
    },
    selectGenre(){
      this.genre = true,
      this.actor = false,
      this.page = 3
    },
    selectActor(){
      this.genre = false,
      this.actor = true,
      this.page = 3
    },
  },
  created() {
    const temp = {}
    this.user.like_movies.forEach(movie => {
      movie.genres.forEach(genre => {
        if (temp[genre.name]) {
          temp[genre.name] = temp[genre.name] + 1
        } else {
          temp[genre.name] = 1
        }
      })
    })
    console.log(temp)
    const ordered = Object.fromEntries(
      Object.entries(temp).sort(([,a], [,b]) => a > b? -1: 1)
    );
    this.likeGenres = Object.keys(ordered).slice(0,3)
    console.log(this.likeGenres)
    const actorTemp = {}
    this.user.like_movies.forEach(movie => {
      movie.actors.forEach(actor => {
        if (actorTemp[actor.name]) {
          actorTemp[actor.name] = actorTemp[actor.name] + 1
        } else {
          actorTemp[actor.name] = 1
        }
      })
    })
    console.log(actorTemp)
    const orderedActor = Object.fromEntries(
      Object.entries(actorTemp).sort(([,a], [,b]) => a > b? -1: 1)
    );
    this.likeActors = Object.keys(orderedActor).slice(0,3)
    const randomLikeActor = _.sampleSize(Object.keys(orderedActor).slice(3,), 10)
    randomLikeActor.forEach(likeActor => this.likeActors.push(likeActor))
    
    // 허허허 안되네... 내일 다시
    console.log(this.likeActors)
    const genreRecommend =this.movies.filter((movie) => {
      return movie.genres.some(genre => this.likeGenres.includes(genre.name))
    })
    console.log('장르추천', genreRecommend)
    this.likeGenreMovies = genreRecommend
    const actorRecommend =this.movies.filter((movie) => {
      return movie.actors.some(actor => this.likeActors.includes(actor.name))
    })
    console.log('배우추천', actorRecommend)
    this.likeActorMovies = actorRecommend
  },

}
</script>
<style scoped>
  h3 {
    color: white;
  }
  .card, h5, span{
    color: black;
  }
</style>

<style>
.button {
  border-radius: 30%;
  background-color: white;
}
.clicked {
  background-color: grey;
}
.card {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.card img {
  object-fit: fill;
  transition:.3s;
}
.card img:hover {
	transform:scale(1.05);
}
</style>