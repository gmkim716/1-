<template>
	<div>
		<p>movieId: {{ movie }}</p> 
	</div>
</template>

<script>
export default {
	name: 'BookMarkedListItem',
	props: {
		movie: String,
	}
}
</script>

<style>

</style>