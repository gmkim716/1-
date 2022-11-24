<template>
  <div>
    <h2>{{ profile?.username }}님의 Profile</h2>
    <div class="row mt-5">
      <div class='col-6 me-5 '>
        <div class="d-flex justify-content-around">
          <h5>이름</h5> <span>{{ profile?.username }}명</span>
        </div>
        <div class="d-flex justify-content-around">
          <h5>팔로워</h5> <span>{{ profile?.followers.length }}명</span>
        </div>
        <div class="d-flex justify-content-around">
          <h5>팔로잉</h5> <span>{{ profile?.followings.length }}명</span>
        </div>
        <div class="d-flex justify-content-around">
          <h5>Likes</h5> <span>{{ profile?.like_movies_count }}개</span>
        </div>
        <div class="mb-4">
        <button class='btn btn-secondary' v-if="user?.id !== profile?.id && !profile?.followers.includes(user?.id)" @click="follow">팔로우</button>
        <button class='btn btn-secondary' v-if="user?.id !== profile?.id && profile?.followers.includes(user?.id)" @click="follow">팔로우 취소</button>
        </div>
        <button class='btn btn-secondary' @click="updateGraph" v-if="user?.id !== profile?.id">{{profile?.username}}님이 좋아하는 장르 그래프 보기</button>
      </div>
      <div class="col-5 bargraph p-3" v-if="user?.id === profile?.id">
        <h5 >좋아하는 장르그래프</h5>
        <LikeGenreBar
        :likeGenres="likeGenres"
        />
      </div>
      <div class="col-5 bargraph p-3" v-if="porfileUserGraph && user?.id !== profile?.id">
        <h5 >좋아하는 장르그래프</h5>
        <LikeGenreBar
        :likeGenres="likeGenres"
        />
      </div>
      
    </div>
    
    <div class='mt-5'>
      <h3>좋아하는 영화목록</h3>
        <swiper
          class="swiper"
          :options="swiperOption"
        >
          <swiper-slide v-for="movie in profile?.like_movies" :key="movie.id" style="width: 100%;">
            <div class="card" style="width: 100%;" @click="goDetail(movie.id)"> 
              <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" class="card-img-top" style="width:100%; height: 25rem;" alt="#"> 
              <div class="card-body">
                <div>
                  <h5 v-if="movie.title.length <= 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie.title }}</h5>
                  <h5 v-if="movie.title.length > 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie.title.slice(0, 13)}}..</h5>
                </div>
                <p class="card-text mb-0" style="font-size:80%;">{{movie.release_date}}</p>
                <div class="d-flex justify-content-between align-items-center px-2">
                  <div>
                    <i class="fa-solid fa-star" style="color:#d63e1c"></i> <span class="card-text">{{movie.vote_average}}</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-heart" style="color:#d63e1c"></i> <span class="card-text">{{movie.like_users.length}}</span>
                  </div>
                </div>
                
              </div>
            </div>
          </swiper-slide>   
          <div
              class="swiper-pagination"
              slot="pagination"
              >
          </div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>      
    </div>
    <div class='mt-5'>
      <h3>시청한 영화목록</h3>
        <swiper
          class="swiper"
          :options="swiperOption"
        >
          <swiper-slide v-for="movie in profile?.watched_movies" :key="movie.id" style="width: 100%;">
            <div class="card" style="width: 100%;" @click="goDetail(movie.id)"> 
              <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" class="card-img-top" style="width:100%; height: 25rem;" alt="#"> 
              <div class="card-body">
                <div>
                  <h5 v-if="movie.title.length <= 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie.title }}</h5>
                  <h5 v-if="movie.title.length > 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie.title.slice(0, 13)}}..</h5>
                </div>
                <p class="card-text mb-0" style="font-size:80%;">{{movie.release_date}}</p>
                <div class="d-flex justify-content-between align-items-center px-2">
                  <div>
                    <i class="fa-solid fa-star" style="color:#d63e1c"></i> <span class="card-text">{{movie.vote_average}}</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-heart" style="color:#d63e1c"></i> <span class="card-text">{{movie.like_users.length}}</span>
                  </div>
                </div>
                
              </div>
            </div>
          </swiper-slide>   
          <div
              class="swiper-pagination"
              slot="pagination"
              >
          </div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>             
    </div>
  </div>
</template>

<script>
// import BookMarkedList from '@/components/BookMarkedList'
import LikeGenreBar from '@/components/LikeGenreBar'
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: 'ProfileView',
  components: {
    LikeGenreBar,
    Swiper,
    SwiperSlide    
  },
  data() {
    return {
      likeGenres: {},
      bookMarkList: null,
      porfileUserGraph: null,
      swiperOption: { 
        slidesPerView: 4, 
        spaceBetween: 30,
        slidesPerGroup: 4,
        loop: true, 
        loopFillGroupWithBlank: true,
        pagination: { 
          el: '.swiper-pagination', 
          clickable: true 
        }, 
        navigation: { 
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev' 
        } 
      },      
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
    },
    updateGraph() {
      console.log('ggg',this.profile)
      const temp = {}
      this.profile?.like_movies.forEach(movie => {
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
      this.porfileUserGraph = !this.porfileUserGraph
    },
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
    this.porfileUserGraph = null
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
      this.porfileUserGraph = null
      this.$store.dispatch('getProfile', Number(to.params.userPk))
    }
  },
  mounted() {
    window.scrollTo(0,0)
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
.swiper {
  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-transform:scale(1);
	-moz-transform:scale(1);
	-ms-transform:scale(1);	
	-o-transform:scale(1);	
	transform:scale(1);
	-webkit-transition:.3s;
	-moz-transition:.3s;
	-ms-transition:.3s;
	-o-transition:.3s;
	transition:.3s;

}
.swiper-slide img:hover {
  -webkit-transform:scale(1.1);
	-moz-transform:scale(1.1);
	-ms-transform:scale(1.1);	
	-o-transform:scale(1.1);
	transform:scale(1.05);
}

.swiper-button-prev{
  color: white;
  -webkit-transform:scale(1);
	-moz-transform:scale(1);
	-ms-transform:scale(1);	
	-o-transform:scale(1);	
	transform:scale(1);
	-webkit-transition:.3s;
	-moz-transition:.3s;
	-ms-transition:.3s;
	-o-transition:.3s;
	transition:.3s;
}

.swiper-button-prev:hover{
  /* background-color: rgb(120, 120, 120, 0.5); */
  color: grey;
  -webkit-transform:scale(1.1);
	-moz-transform:scale(1.1);
	-ms-transform:scale(1.1);	
	-o-transform:scale(1.1);
  transform:scale(1.2);
}

.swiper-button-next{
  color: white;
  -webkit-transform:scale(1);
	-moz-transform:scale(1);
	-ms-transform:scale(1);	
	-o-transform:scale(1);	
	transform:scale(1);
	-webkit-transition:.3s;
	-moz-transition:.3s;
	-ms-transition:.3s;
	-o-transition:.3s;
	transition:.3s;
}

.swiper-button-next:hover{
  /* background-color: rgb(120, 120, 120, 0.5);
  border-radius: 10%; */
  color: grey;
  -webkit-transform:scale(1.1);
	-moz-transform:scale(1.1);
	-ms-transform:scale(1.1);	
	-o-transform:scale(1.1);
  transform:scale(1.2);
}

.swiper-pagination {
  
  position: relative;
  top: 5px;
}
.swiper-pagination-bullet {
  background-color: white;
}  
</style>