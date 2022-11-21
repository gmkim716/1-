<template>
	<div>
		<iframe :src="videoUrl"></iframe>
	</div>
</template>

<script>
export default {
	name: 'VideoYoutubeItem',
	props: {
		video: Object
	},
	computed:{
		videoUrl () {
			return `https:/www.youtube.com/embed/${this.video?.id.videoId}`
		},
	},
}
</script>

<style>
</style>