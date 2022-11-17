<template>
  <div>
    <h1>Detail</h1>
    <p>{{ movie }}</p>
    <p>영화id: {{ movie.id }}</p>
    <p>영화 제목: {{ movie.title }}</p>
    <p>개봉일: {{ movie.release_date }}</p>
    <p>popularity: {{ movie.popularity }}</p>
    <p>투표수: {{ movie.vote_count }}</p>
    <p>평점: {{ movie.vote_average }}</p>
    <p>포스터: <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="movie.poster_path "></p >
    <p>youtubeKey: {{ movie.youtube_key }}</p>
    <p>장르: {{ movie.genres }}</p>
    <p>개요: {{ movie.overview }}</p>
    <p>출연 배우: {{ movie.actors }}</p>
    <router-link :to="{name: 'HomeView'}">뒤로가기</router-link>
  </div>
</template>

<script>
export default {
  name: 'DetailView',
  data() {
    return {
      movie: null
    }
  },
  computed: {
     movies() {
      return this.$store.state.popularMovie  // popularMovie로 전체 영화 데이터 대체
    }
  },
  methods: {
    getMovieById(id) {
      for (const movie of this.movies) {
        if (movie.id === Number(id)) {
          this.movie = movie
          if (this.movie.vote_average === 0) {
            this.movie.vote_average = '평점없음!!'
          }
          if (!this.movie.overview) {
            this.movie.overview = '개요 없음!!'
          }
          break
        }
      }
    }
  },
  created() {
    this.getMovieById(this.$route.params.id)
  }
}
</script>

<style>

</style>