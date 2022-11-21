<template>
  <div>
    <h1>Detail</h1>
    <p>{{ movie }}</p>
    
    <p>영화id: {{ movie?.id }}</p>
    <p>영화 제목: {{ movie?.title }}</p>
    <p>개봉일: {{ movie?.release_date }}</p>
    <p>popularity: {{ movie?.popularity }}</p>
    <p>투표수: {{ movie?.vote_count }}</p>
    <p>평점: {{ movie?.vote_average }}</p>
    <p>포스터: <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" alt="movie.poster_path "></p >
    <div v-if="movie?.youtube_key !== 'nothing'">
      <p>youtubeKey: {{ movie?.youtube_key }}</p>
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
    <p>장르: {{ movie?.genres }}</p>
    <p>개요: {{ movie?.overview }}</p>
    <p>출연 배우: {{ movie?.actors }}</p>
    <button v-if="!isLiked" @click="likeMovie">좋아요</button>
    <button v-if="isLiked" @click="likeMovie">좋아요 취소</button>
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
    }
  },
  methods: {
    movieInfo(movie_id){
      this.$store.dispatch('movieInfo', movie_id)
    },
    likeMovie() {
      if (this.$store.state.user) {
      this.$store.dispatch('likeMovie', this.movie)
      } else {
        this.$router.push({ name: 'LoginView'})
      }
    },
  },
  created() {
    this.$store.dispatch('getMovieDetail', Number(this.$route.params.id))
  }
}
</script>


<style>

</style>