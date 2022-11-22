<template>
	<div>
		<h1>BookMarkedList</h1>
		<BookMarkedListItem
			v-for="movie in profile.like_movies"
			:key="movie.id"
			:movie="movie"
		/>
	</div>
</template>

<script>
import BookMarkedListItem from '@/components/BookMarkedListItem';
export default {
	name: 'BookMarkedList',
	props: {
		profile: Object
	},
	data() {
		return {
			movies: null,
		}
	},
	components: {
		BookMarkedListItem
	},
	methods: {
		likeMovies() {
			this.likeMovies = this.profile.like_movies
		}
	},
	created() {
		this.likeMovies()
		console.log('profile.like_movies:', this.profile.like_movies)
	},
}
</script>

<style>

</style>