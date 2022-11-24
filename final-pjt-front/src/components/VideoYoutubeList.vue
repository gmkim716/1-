<template>
  <div>
		<h2>관련 영상</h2>
    <!-- 여기에 트레일러 적용하기 -->
    <div v-for="video in this.videos?.items" :key="video.etag">
      <div>
        {{ video.snippet.title}}
      </div>
    </div>
    <swiper
      class="swiper"
      :options="swiperOption"
      id="youtubes"
    >
      <swiper-slide v-for="(video, index) in videos?.items" :key="index">
        <iframe :src="`https:/www.youtube.com/embed/${video.id.videoId}`" ></iframe>
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
</template>

<script>
import axios from 'axios';

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

// const API_KEY = process.env.VUE_APP_YOUTUBE_KEY
// console.log('API_KEY', API_KEY)

export default {
  name: 'VideoYoutubeList',
	data() {
		return {
			videos: null,
      swiperOption: { 
        slidesPerView: 2, 
        spaceBetween: 0,
        slidesPerGroup: 2,
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
	props: {
		movieTitle: String
	},
	components: {
		Swiper,
    SwiperSlide
	},
	methods: {
    loadYoutubeList() {
      // if (this.videos) return
			axios({
				url: 'https://www.googleapis.com/youtube/v3/search',
				method: 'get',
				params: {
					key: 'AIzaSyB_IRXndunp4GqMPrv8n7MRAk3hgpv6HR8',
					part: 'snippet',
					q: `${this.movieTitle}`,
          maxResults: 10,
					type: 'video'
				}
			})
				.then( res => {
					this.videos = res.data
				})
				.catch( err => {
					console.log('err:', err)
				})
		}
	},
	watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      this.videos = null
    }
  },
	mounted() {
    this.loadYoutubeList()
	},
}
</script>

<style>
.swiper #youtubes {
  width: 100%;
  height: 18rem;
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

.swiper-slide iframe {
  display: block;
  width: 90%;
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