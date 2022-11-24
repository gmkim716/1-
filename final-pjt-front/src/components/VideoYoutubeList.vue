<template>
  <div>
    <h2>OST 영상</h2>
    <button @click="loadOst" v-if="!showOst">OST 불러오기</button>
    <button @click="loadOst" v-if="showOst">OST 숨기기</button>
    <swiper
      class="swiper"
      :options="swiperOption"
      id="youtubes"
      v-if="showOst"
    >
      <swiper-slide v-for="(video, index) in ostVideos?.items" :key="index">
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

		<h2>결말포함 영상</h2>
    <button @click="loadYoutubeList" v-if="!showSpoiler">결말포함 영상 보기</button>
    <button @click="loadYoutubeList" v-if="showSpoiler">결말포함 영상 숨기기</button>
    <!-- 여기에 트레일러 적용하기 -->
    <swiper
      class="swiper"
      :options="swiperOption"
      id="youtubes"
      v-if="showSpoiler"
    >
      <swiper-slide v-for="(video, index) in spoilerVideos?.items" :key="index">
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

const API_KEY = 'AIzaSyA7AXY29GFVsmTUuP0_FsG0OFZVgQOltQQ'
// console.log('API_KEY', API_KEY)

export default {
  name: 'VideoYoutubeList',
  props: {
    spoiler: String,
    ost: String,
  },
	data() {
		return {
      showOst:false,
      showSpoiler:false,
			spoilerVideos: null,
      ostVideos: null,
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
	components: {
		Swiper,
    SwiperSlide
	},
	methods: {
    loadYoutubeList() {
      this.showSpoiler = !this.showSpoiler
			axios({
				url: 'https://www.googleapis.com/youtube/v3/search',
				method: 'get',
				params: {
					key: API_KEY,
					part: 'snippet',
					q: `${this.spoiler}`,
          maxResults: 10,
					type: 'video'
				}
			})
				.then(res => {
          console.log('결말포함영상',res)
					this.spoilerVideos = res.data
				})
				.catch( err => {
					console.log('err:', err)
				})
		},
    loadOst() {
      this.showOst = !this.showOst
      axios({
        method: 'get',
        url: 'https://www.googleapis.com/youtube/v3/search',
        // params에 필수 + 추가 옵션들이 들어가야함 (api키, 내용,...) => api배포 페이지 확인
        params: {
          key: API_KEY,
          part: 'snippet',
          q: `${this.ost}`,
          maxResults: 10,
          type: 'video',
        },
      })
        .then((res) => {
          console.log('OST',res)
          this.ostVideos = res.data
        })
        .catch(err => console.log(err))
    },
	},
	watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
      this.videos = null
    }
  },
}
</script>

<style scoped>
.swiper{
  width: 100%;
  height: 20rem;
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