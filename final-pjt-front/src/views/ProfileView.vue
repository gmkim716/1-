<template>
  <div>
    <h4>ProfileView</h4>
    <p>이름 : {{ profile?.username }}</p>
    <p>팔로잉: {{ profile?.followings.length }}명 {{ profile?.followings }}</p>
    <p>팔로워: {{ profile?.followers.length }}명 {{ profile?.followers }}</p>
    <p>좋아하는 영화({{ profile?.like_movies_count }} 개) : {{ profile?.like_movies }}</p>
    <!-- <p>{{ bookMarkList }}</p> -->
    <BookMarkedList
      :profile="profile"
    />

    <button v-if="user?.pk !== profile?.id" @click="follow">팔로우</button>
  </div>
</template>

<script>
import BookMarkedList from '@/components/BookMarkedList'

export default {
  name: 'ProfileView',
  components: {
    BookMarkedList
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
      this.bookMarkList = this.profile.like_movies
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

</style>