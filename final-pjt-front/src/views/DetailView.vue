<template>
  <div>
    <div class='d-flex mt-1 mb-5' id='upside'>
      <div class='d-flex col col-md-5 justify-content-center'>
        <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" alt="movie.poster_path" style="height:500px;">
      </div>
      <div id="upper" class='d-flex align-items-center'>
        <ul>
          <h1 class='mb-3'>{{ movie?.title }}</h1>
          <div class='mb-5'>
            <p>개봉일: {{ movie?.release_date }}</p>
          </div>
          <li v-if="(movie?.release_date <= this.today)">인기도: {{ movie?.popularity }}</li>
          <li v-if="(movie?.release_date <= this.today)">투표수: {{ movie?.vote_count }}</li>
          <li v-if="(movie?.release_date <= this.today)">평점: {{ movie?.vote_average }}</li>
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
          <div class="col col-md-4">
            <div class='d-flex justify-content-between'>
              <!-- 이미 본 영화 체크 -->
              <i title="시청한 영화" id='watched' v-if="(movie?.release_date <= this.today) && isWatched" @click="watchedMovie" class="fa-solid fa-square-check fa-2x true" style="color:green"></i>
              <i title="시청한 영화" id='watched' v-if="(movie?.release_date <= this.today) && !isWatched" @click="watchedMovie" class="fa-regular fa-square-check fa-2x"></i>
              <!-- 영화 좋아요 체크 -->
              <i title="좋아요" id='like' v-if="isLiked" @click="likeMovie" class="fa-solid fa-heart fa-2x true"></i>
              <i title="좋아요" id='like' v-if="!isLiked" @click="likeMovie" class="fa-regular fa-heart fa-2x"></i>
              <!-- 보고싶은 영화 체크 -->
              <i title="북마크" id='bookmark' v-if="isBookmarked" @click="bookmarkedMovie" class="fa-solid fa-bookmark fa-2x true"></i>
              <i title="북마크" id='bookmark' v-if="!isBookmarked" @click="bookmarkedMovie" class="fa-regular fa-bookmark fa-2x"></i>
            </div>
          </div>
        </ul>
      </div>
    </div>

    <div id="content" class='gx-0' >
      <div class='d-flex'>
        <div id='story' class='col col-md-7 mt-5'>
          <div class="col col-md-10 mx-auto">
            <p v-if="movie?.overview && movie?.overview.length > 30">{{ overview }}</p>
            <p v-else-if="movie.overview">{{ overview }}</p>
            <p v-else>등록된 줄거리가 없습니다</p>
          </div>
        </div>
        <div id='video' class='col col-md-4 gx-0' v-if="movie?.youtube_key !== 'nothing'">
          <VideoItem
            :youtubeKey="movie?.youtube_key"
          />
        </div>
      </div>

      <VideoYoutubeList
      :movieTitle="movie?.title"
      />
      <span v-if="(movie?.youtube_key === 'nothing')">
      </span>
      <ReviewForm/>
      <ReviewList/>
      <router-link :to="{name: 'HomeView'}">뒤로가기</router-link>
    </div>
  </div>
</template>


<script>
import ReviewList from '@/components/ReviewList'
import ReviewForm from '@/components/ReviewForm'
import VideoItem from '@/components/VideoItem'
import VideoYoutubeList from '@/components/VideoYoutubeList'


const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const today = year +'-'+ month +'-'+ day


export default {
  name: 'DetailView',
  data() {
    return {
      today: today,
    }
  },
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
    isBookmarked(){
      return this.$store.getters.isBookmarked
    },
    overview() {
      const splitList = this.$store.getters.movie?.overview.split(' ')
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
    },
    bookmarkedMovie() {
      if (this.$store.state.user) {
        this.$store.dispatch('bookmarkedMovie', this.movie)
      } else {
        this.$router.push({ name: 'LoginView'})
      }
    },
  },
  created() {
    this.$store.dispatch('getMovieDetail', Number(this.$route.params.id))
  },
  mounted() {
    window.scrollTo(0,0)
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      this.$store.dispatch('getMovieDetail', Number(this.$route.params.id))
    }
  },
}
</script>


<style scoped>
  #upside{
    background: #02142b  ;
    display: inline-block;
    width: 100%;
    text-align: justify;
  }
  #upsideDetail{
    display: inline-block;
  }
  #like.true  {
    color: red;
  }
  #like {
    color: white;
  }
  #bookmark.true {
    color: yellow;
  }
  #bookmark {
    color: white;
  }
  li {
    list-style: none;
  }
  div {
    color: #d2d2d2;
  }
  #video {
    margin: 50px;
  }
  #content {
    background: #262626;
  }
  #watched:hover {
    color: white;
  }
  #upper {
    color: whilte;
    font-size: 120%;
  }
  .speech-bubble {
	position: relative;
	background: #b5dade;
	border-radius: .4em;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 41px solid transparent;
	border-top-color: #b5dade;
	border-bottom: 0;
	border-left: 0;
	margin-left: -20.5px;
	margin-bottom: -41px;
}

.arrow_box {
  /* display: none; */
  position: absolute;
  /* top:130px; */
  width: 100px;
  padding: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;  
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-size: 14px;
}
  .arrow_box:after {
    position: absolute;
  }

.arrow_box_check {
  left: 500px;
}
.arrow_box_like {
  top: 550px;
}
.arrow_box_checked {
  top: 550px;
}
.arrow_box_bookmark {
  top: 550px;
}

#watched:hover+.arrow_box {
  display:block;
  color: skyblue;
}
/* #watched:hover+.arrow_box_checked, #like:hover+.arrow_box_like, #bookmark:hover+.arrow_box_bookmark {
  display: block;
  background: skyblue;
  color: skyblue;
} */

</style>