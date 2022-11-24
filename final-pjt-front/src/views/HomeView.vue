<template>
  <div>
    <h2>HomeView</h2>
    <hr>
    <h3>최신순</h3>
    <swiper
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="movie in latest.slice(0,40)" :key="movie.id" style="width: 100%;">
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
    <hr>
    <h3>인기순</h3>
    <swiper
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="movie in popularMovies.slice(0,40)" :key="movie.id" style="width: 100%;">
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
    <hr>
    <h3>평점순</h3>
    <swiper
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="movie in ratedMovies.slice(0,40)" :key="movie.id" style="width: 100%;">
        <div class="card" style="width: 100%;" @click="goDetail(movie.id)" > 
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
    <hr>
    <h3>상영예정</h3>
    <swiper
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="movie in upComingMovies.slice(0,40)" :key="movie.id" style="width: 100%;">
        <div class="card" style="width: 100%;" @click="goDetail(movie.id)" > 
          <img :src="`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`" class="card-img-top" style="width:100%; height:25rem;" alt="#"> 
          <div class="card-body">
            <div>
              <h5 v-if="movie.title.length <= 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie.title }}</h5>
              <h5 v-if="movie.title.length > 14" style="font-size:100%; font-weight: bold;" class="card-title mb-0">{{ movie.title.slice(0, 13)}}..</h5>
            </div>
            <p class="card-text mb-0" style="font-size:80%;">{{movie.release_date}}</p>
            <div class="d-flex justify-content-end align-items-center px-2">
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
  <hr>
  
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
// import LastestList from '@/components/LastestList'
// import PopularList from '@/components/PopularList'
// import UpComingList from '@/components/UpComingList'
// import CustomList from '@/components/CustomList'
// import RatedList from '@/components/RatedList'

export default {
  name: 'HomeView',
  data() {
    return {
      // latest: null,
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
  components: {
    // LastestList,
    // PopularList,
    // UpComingList,
    // CustomList,
    // RatedList,
    Swiper,
    SwiperSlide
  },
  created(){
    this.getMovies()
    this.getWeatherMovies()
    this.$store.commit('RESET_DETAIL')
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    },
    getMovies() {
      this.$store.dispatch('getMovies')
    },
    getWeatherMovies() {
      this.$store.dispatch('getWeatherMovies')
    },
    // latestMovies() {
    //   const movies = this.$store.getters.latestMovies.slice()
    //   this.latest = movies
    // }
  },
  computed: {
    latest () {
      return this.$store.getters.latestMovies
    },
    popularMovies() {
      return this.$store.getters.popularMovies
    },
    ratedMovies() {
      return this.$store.getters.ratedMovies
    },
    upComingMovies() {
      return this.$store.getters.upComingMovies
    }      

  }
  // mounted() {
  //   this.latestMovies()
  // }
}
</script>

<style scoped>
  h3 {
    color: white;
  }
  .card, h5, span{
    color: black;
  }
</style>

<style>
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