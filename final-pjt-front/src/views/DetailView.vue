<template>
  <div>
    <div class='d-flex' id='upside'>
      <div class='d-flex col col-md-5 justify-content-center'>
        <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" alt="movie.poster_path" style="height:500px;">
      </div>
      <div class='d-flex align-items-center'>
        <ul>
          <!-- <li>영화id: {{ movie?.id }}</li> -->
          <h1>{{ movie?.title }}</h1>
          <b>개봉일: {{ movie?.release_date }}</b>
          <li>인기도: {{ movie?.popularity }}</li>
          <li>투표수: {{ movie?.vote_count }}</li>
          <li>평점: {{ movie?.vote_average }}</li>
          <li>
            <span>장르 : </span>
            <span v-for="genre in movie?.genres" :key="genre.id">
              <span> #{{ genre.name }} </span>
            </span>
          </li>
          <li>
            <span>출연 배우: </span>
            <span v-for="(actor, index) in movie?.actors" :key="actor.id" :index="index">
              <span v-if="index+1 == movie?.actors.length"> {{ actor.name }} </span>
              <span v-else> {{ actor.name }}, </span>
            </span>
          </li>
          <br>
          <div class="col col-md-3">
            <div class='d-flex justify-content-between'>
              <!-- 이미 본 영화 체크 -->
              <i v-if="isWatched" @click="watchedMovie" class="fa-solid fa-square-check fa-2x true" style="color:green"></i>
              <i v-if="!isWatched" @click="watchedMovie" class="fa-regular fa-square-check fa-2x"></i>
              <!-- 영화 좋아요 체크 -->
              <i v-if="isLiked" @click="likeMovie" class="fa-solid fa-heart fa-2x true" id='like'></i>
              <i v-if="!isLiked" @click="likeMovie" class="fa-regular fa-heart fa-2x"></i>
              <!-- 보고싶은 영화 체크 --><!-- 구현 안됬음 !!-->
              <i v-if="isBookmarked" class="fa-solid fa-bookmark fa-2x true" style="color: yellow"></i>
              <i v-if="!isBookmarked" class="fa-regular fa-bookmark fa-2x"></i>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div>
      <h1>줄거리</h1>
      <p v-if="movie.overview && overview.length > 30">{{ overview }}</p>
      <p v-else-if="movie.overview">{{ overview }}</p>
      <p v-else>등록된 줄거리가 없습니다</p>
    </div>
    <div v-if="movie?.youtube_key !== 'nothing'">
      <VideoItem
        :youtubeKey="movie?.youtube_key"
      />
      <VideoYoutubeList
      :movieTitle="movie?.title"
      />
    </div>
    <div v-if="movie?.youtube_key === 'nothing'">
      <p>유튜브 트레일러가 존재하지 않습니다.</p>
    </div>
    <ReviewForm/>
    <ReviewList/>
    <router-link :to="{name: 'HomeView'}">뒤로가기</router-link>
  </div>
</template>


<script>
import ReviewList from '@/components/ReviewList'
import ReviewForm from '@/components/ReviewForm'
import VideoItem from '@/components/VideoItem'
import VideoYoutubeList from '@/components/VideoYoutubeList'

export default {
  name: 'DetailView',
  components: {
    ReviewList,
    ReviewForm,
    VideoItem,
    VideoYoutubeList,
  },
  computed: {
    movie() {
      return this.$store.getters.movie
    },
    genres() {
      return this.$store.getters.genres
    },
    actors() {
      return this.$store.getters.actors
    },  
    isLiked(){
      return this.$store.getters.isLiked
    },
    isWatched(){
      return this.$store.getters.isWatched
    },
    overview() {
      const splitList = this.movie.overview.split(' ')
      const lastWord = splitList[splitList.length-1]
      const finalText = lastWord[lastWord.length-1]
      if (finalText == '?' || finalText == '!') {
        return splitList.join(' ')
      } else if (finalText == '.'){
        return splitList.join(' ') + '.'
      } else {
        return lastWord[lastWord.length-1]
      }
    }
  },
  methods: {
    movieInfo(movie_id){
      this.$store.dispatch('movieInfo', movie_id)
    },
    likeMovie() {
      if (this.$store.state.user) {
        this.$store.dispatch('likeMovie', this.movie)
        console.log(this.$store.state.isWatched)
      } else {
        this.$router.push({ name: 'LoginView'})
      }
    },
    watchedMovie() {
      if (this.$store.state.user) {
        this.$store.dispatch('watchedMovie', this.movie)
      } else {
        this.$router.push({ name: 'LoginView'})
      }
    }
  },
  created() {
    this.$store.dispatch('getMovieDetail', Number(this.$route.params.id))
    
  },
  mounted() {
    // this.$store.dispatch('getMovieGenres', Number(this.$route.params.id))
    // this.$store.dispatch('getMovieActors', Number(this.$route.params.id))
    window.scrollTo(0,0)
  }

}
</script>


<style scoped>
  #upside{
    background: lightcyan;
    display: inline-block;
    width: 100%;
    text-align: justify;
  }
  #upsideDetail{
    display: inline-block;
  }
  #like  {
    color: red;
  }
  li {
    list-style: none;
  }
</style>