<template>
  <div>
		<h2>관련 영상</h2>
		<!-- <VideoYoutubeItem
			v-for="video in videos"
			:key="video.etag"
			:video="video"
		/> -->
    <VideoYoutubeItem
      v-for="video in videos"
      :key="video.etag"
      :video="video"
    />
	</div>
</template>

<script>
import VideoYoutubeItem from '@/components/VideoYoutubeItem'
import axios from 'axios';

// const API_KEY = process.env.VUE_APP_YOUTUBE_KEY
// console.log('API_KEY', API_KEY)


export default {
  name: 'VideoYoutubeList',
	data() {
		return {
			videos: null,
		}
	},
	props: {
		movieTitle: String
	},
	components: {
		VideoYoutubeItem,
	},
	methods: {
    loadYoutubeList() {
			axios({
				url: 'https://www.googleapis.com/youtube/v3/search',
				method: 'get',
				params: {
					key: 'AIzaSyB0JlyR-N0MiqIMJDtRoQOdjkVtLGCWeMI',
					part: 'snippet',
					q: `${this.movieTitle}`,
					type: 'video'
				}
			})
				.then( res => {
					this.videos = res.data.items
				})
				.catch( err => {
					console.log('err:', err)
				})
		}
	},
	mounted() {
		this.loadYoutubeList()
	}
}
</script>

<style>

</style>