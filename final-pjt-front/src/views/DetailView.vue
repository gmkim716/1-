<template>
  <div>
    <h1>Detail</h1>
    <p>{{ movie }}</p>
    <!-- <ReviewList/> -->
    <p>영화id: {{ movie?.id }}</p>
    <p>영화 제목: {{ movie?.title }}</p>
    <p>개봉일: {{ movie?.release_date }}</p>
    <p>popularity: {{ movie?.popularity }}</p>
    <p>투표수: {{ movie?.vote_count }}</p>
    <p>평점: {{ movie?.vote_average }}</p>
    <p>포스터: <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" alt="movie.poster_path "></p >
    <p>youtubeKey: {{ movie?.youtube_key }}</p>
    <p>장르: {{ movie?.genres }}</p>
    <p>개요: {{ movie?.overview }}</p>
    <p>출연 배우: {{ movie?.actors }}</p>
    <button v-if="!isLiked" @click="likeMovie">좋아요</button>
    <button v-if="isLiked" @click="likeMovie">좋아요 취소</button>
    <router-link :to="{name: 'HomeView'}">뒤로가기</router-link>
  </div>
</template>


<script>
// import ReviewList from '@/components/ReviewList'

export default {
  name: 'DetailView',
  // components: {
  //   ReviewList
  // },
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