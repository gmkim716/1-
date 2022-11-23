<template>
  <div>
    <div @click="goDetail(result.id)"
      v-for="result in results"
      :key="result.id"
    >
    <div id='item' class='d-flex col-md-7 mx-auto'>
      <div class="image_wrap col-md-3">
        <img :src="`https://image.tmdb.org/t/p/w500/${result?.poster_path}`" class="card-img-top" style="width:100px; height:auto;" alt="#"> 
      </div>
      <div class='info_list'>
        <h5>{{ result.title }} ({{ result.release_date.slice(0, 4) }})</h5>
        <span v-for="actor in result.actors" :key="actor.id">{{ actor.name }}, </span>
        <div class="mt-3">
          <span v-if="result.overview">{{ result?.overview.slice(0, 84) }}..</span>
        </div>
      </div>
    </div>
    <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchListView',
  computed: {
    results() {
      return this.$store.getters.results
    },
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'detail', params: {id} })
    },
  },
  mounted() {
    console.log(this.$route.query)
  }

}
</script>

<style>
  .info_list {
    text-align: left;
  }
  #item{ 
    align-items: center;
  }
</style>