<template>
	<div>
		<iframe :src="videoUrl" allowfullscreen></iframe>
	</div>
</template>
<script>

export default {
	name: 'VideoItem',
	props: {
		youtubeKey: String
	},
	computed: {    
		videoUrl() {
			return `https:/www.youtube.com/embed/${this.youtubeKey}`
		}
	}
}
</script>
<style>
	iframe {
		width: 426px;
		height: 240px;
	}
	#video {
		background-color: black;
	}
</style>