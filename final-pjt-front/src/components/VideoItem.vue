<template>
	<div>
		<iframe :src="videoUrl"></iframe>
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
		height: 360px;
		width: 640px;
	}
</style>