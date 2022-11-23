<template>
  <div>
    <h2>Profile</h2>
    <div class='col-md-5 mx-auto'>
      <div class="d-flex justify-content-around">
        <h5>이름</h5> <span>{{ profile?.username }}명</span>
      </div>
      <div class="d-flex justify-content-around">
        <h5>팔로워</h5> <span>{{ profile?.followers.length }}명</span>
      </div>
      <div class="d-flex justify-content-around">
        <h5>팔로워</h5> <span>{{ profile?.followers.length }}명</span>
      </div>
      <div class="d-flex justify-content-around">
        <h5>Likes</h5> <span>{{ profile?.like_movies_count }}개</span>
      </div>
    </div>
    <button class='btn btn-secondary' v-if="user?.pk !== profile?.id" @click="follow">팔로우</button>
    <button class='btn btn-secondary' v-if="user?.pk !== profile?.id" @click="follow">팔로우 취소</button>
    <div class='mt-5'>
      <h3>좋아하는 영화목록</h3>
        <div v-for="movie in profile?.like_movies" :key="movie.id">{{ movie.title }}</div>
    </div>
    <div class="bargraph p-3" v-if="user.id === profile.id">
      <h5 >좋아하는 장르그래프</h5>
      <LikeGenreBar
      :likeGenres="likeGenres"
      />
    </div>
    <div class='mt-5'>
      <h3>시청한 영화목록</h3>
        <div v-for="movie in profile?.watched_movies" :key="movie.id">{{ movie.title }}</div>
    </div>
  </div>
</template>

<script>
// import BookMarkedList from '@/components/BookMarkedList'
import LikeGenreBar from '@/components/LikeGenreBar'

export default {
  name: 'ProfileView',
  components: {
    LikeGenreBar,   
  },
  data() {
    return {
      likeGenres: {},
      bookMarkList: null,
    }
  },
  methods: {
    follow(){
      if(this.user) {
        this.$store.dispatch('follow', Number(this.$route.params.userPk))
      } else {
        this.$router.push({ name: 'LoginView' })
      }
    },
    bookMarks() {
      this.bookMarkList = this.profile?.like_movies
    }
  },
  computed: {
    profile() {
      return this.$store.getters.profile
    },
    user(){
      return this.$store.getters.user
    }
  },
  created() {
    this.$store.dispatch('getProfile', Number(this.$route.params.userPk)),
    this.bookMarks()
    console.log('ti',this.profile)
    const temp = {}
    this.user?.like_movies.forEach(movie => {
      movie.genres.forEach(genre => {
        if (temp[genre.name]) {
          temp[genre.name] = temp[genre.name] + 1
        } else {
          temp[genre.name] = 1
        }
      })
    })
    this.likeGenres = Object.fromEntries(
      Object.entries(temp).sort(([,a], [,b]) => a > b? -1: 1)
    );
    console.log(this.likeGenres)
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      this.$store.dispatch('getProfile', Number(to.params.userPk))
    }
  },

  
}
</script>

<style>
  td {
    text-size-adjust: 10px;
  }
  .bargraph{
    border: 1px solid white;
  }
</style>