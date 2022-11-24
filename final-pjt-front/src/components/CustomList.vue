<template>
  <div>
    <div class='col-md-3 my-4' style='background-color:#D4964A'>
      <h3>CustomList</h3>
    </div>

  </div>
</template>

<script>

export default {
  name: 'CustomList',
  props: {
    user:Object,
    movies:Array,
  },
  data() {
    return {
      likeGenres: null,
      recommends: [],
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
    // Swiper,
    // SwiperSlide
  },
  created() {
    const temp = {}
    this.user.like_movies.forEach(movie => {
      movie.genres.forEach(genre => {
        if (temp[genre.name]) {
          temp[genre.name] = temp[genre.name] + 1
        } else {
          temp[genre.name] = 1
        }
      })
    })
    const ordered = Object.fromEntries(
      Object.entries(temp).sort(([,a], [,b]) => a > b? -1: 1)
    );
    this.likeGenres = Object.keys(ordered).slice(0,3)
    console.log(this.likeGenres)
    // 허허허 안되네... 내일 다시
    console.log(this.movies)
    const recommend =this.movies.filter((movie) => {
      return movie.genres.some(genre => this.likeGenres.includes(genre.name))
    })
    console.log('추천', recommend)
  },

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

</style>