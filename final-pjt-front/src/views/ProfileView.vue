<template>
  <div>
    <h2>ProfileView</h2>
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
      <br>
      <br>
    <div>
      <div class='col-md-5 mx-auto'>
        <h3>좋아하는 영화목록</h3>
            <div v-for="movie in profile?.like_movies" :key="movie.id">{{ movie.title }}</div>
      </div>
    </div>
    <br>
    <br>
    <div>
      <div>
        <h3>시청한 영화목록</h3>
          <div v-for="movie in profile?.watched_movies" :key="movie.id">{{ movie.title }}</div>
      </div>
    </div>
    <button class='btn btn-secondary' v-if="user?.pk !== profile?.id" @click="follow">팔로우</button>
  </div>
</template>

<script>
// import BookMarkedList from '@/components/BookMarkedList'

export default {
  name: 'ProfileView',
  components: {
    // BookMarkedList
  },
  data() {
    return {
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
</style>