<template>
  <div>
    <h2>User Library</h2>
    <hr>
    <div class="d-flex justify-content-evenly">
      <button @click="like"  :class="{'clicked': liked}" >좋아요한 영화</button>
      <button @click="watch" :class="{'clicked': watched}" >이미 시청한 영화</button>
      <button @click="bookmark" :class="{'clicked': bookmarked}">북마크한 영화</button>
    </div>
    <hr>
    <div id='itemList' v-show="this.liked">
      <div class="row mx-auto">
        <LibraryLike 
          v-for="movie in user?.like_movies" 
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
    <div id='itemList' v-show="this.watched">
      <div class="row mx-auto">
        <LibraryWatched 
          v-for="movie1 in user?.watched_movies" 
          :key="movie1.id"
          :movie="movie1"
        />
      </div>
    </div>
    <div id='itemList' v-show="this.bookmarked">
      <div class="row mx-auto">
        <LibraryBookMarked 
          v-for="movie in user?.bookmarked_movies" 
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>  

  </div>
</template>

<script>
import LibraryLike from '@/components/LibraryLike' 
import LibraryWatched from '@/components/LibraryWatched'
import LibraryBookMarked from '@/components/LibraryBookMarked'

export default {
  name: 'LibraryView',
  data() {
    return {
      liked: true,
      watched: false,
      bookmarked: false,
    }
  },
  components: {
    LibraryLike,
    LibraryWatched,
    LibraryBookMarked,
  },
  methods: {
    like() {
      this.liked = true,
      this.watched = false,
      this.bookmarked = false,
      console.log(this.liked, this.watched, this.bookmarked)
    },
    watch() {
      this.liked = false,
      this.watched = true,
      this.bookmarked = false,
      console.log(this.liked, this.watched, this.bookmarked)
    },
    bookmark() {
      this.liked = false,
      this.watched = false,
      this.bookmarked = true
      console.log(this.liked, this.watched, this.bookmarked)  
    },

  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  mounted() {
    if (this.user) {
      this.$store.dispatch('getUserDetail', this.user.id)
    } else {
      this.$router.push({ name: 'LoginView' })
    }
    window.scrollTo(0,0)
  },
  
}
</script>

<style>
.button {
  border-radius: 30%;
  background-color: white;
}
.clicked {
  background-color: grey;
}
</style>