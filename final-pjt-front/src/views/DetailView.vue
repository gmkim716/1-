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
          <h4>{{ movie?.release_date }}</h4>
          <p>인기도: {{ movie?.popularity }}</p>
          <p>투표수: {{ movie?.vote_count }}</p>
          <p>평점: {{ movie?.vote_average }}</p>
          <p>장르: {{ movie?.genres }}</p>
          <span>{{ movie?.overview }}</span>
          <div>
            <div class='d-flex align-items-center'>
              <!-- <button v-if="!isLiked" @click="likeMovie">좋아요</button>
              <button v-if="isLiked" @click="likeMovie">좋아요 취소</button> -->
              <button v-if="!isWatched" @click="watchedMovie">아직 보지 않은 영화</button>
              <button v-if="isWatched" @click="watchedMovie">이미 본 영화</button>

              <i v-if="isLiked" @click="likeMovie" class="fa-solid fa-heart fa-2x" id='like'></i>
              <i v-if="!isLiked" @click="likeMovie" class="fa-regular fa-heart fa-2x"></i>
            </div>
          </div>
          <p>출연 배우: {{ movie?.actors }}</p>
        </ul>
      </div>
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
    isLiked(){
      return this.$store.getters.isLiked
    },
    isWatched(){
      return this.$store.getters.isWatched
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
</style>