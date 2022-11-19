import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const today = year +'-'+ month +'-'+ day

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    popularMovie: [],
    latestMovies: [],
    ratedMovies: [],
    weatherMovies: [],
    movieDetail: null,
    // movieReview: null,
    isLiked: null,
    likeCount: null,
    token: null,
    user: null,

  },
  getters: {
    // test용으로 slice()적용해 놓음
    popularMovies: (state) => state.popularMovie.slice(0,6),
    latestMovies: (state) => state.latestMovies.slice(0,6),
    ratedMovies: (state) => state.ratedMovies.slice(0,6),
    weatherMovies: (state) => state.weatherMovies.slice(0,6),
    isLogin(state) {
      return state.token ? true : false
    },
    authHead: (state) => ({ Authorization: `Token ${state.token}`}),
    user: (state) => state.user,
    movie: (state) => state.movieDetail,
    isLiked: (state) => state.isLiked,
    likeCount: (state) => state.likeCount,
    reveiws: (state) => state.movieDetail.review_set,
  },
  mutations: {
    // 영화 관련 정보
    GET_POPULAR_MOVIES(state, p_movies) {
      state.popularMovie = p_movies
    },
    GET_LATEST_MOVIES: (state, l_movies) => state.latestMovies = l_movies,
    GET_RATED_MOVIES: (state, r_movies) => state.ratedMovies = r_movies,
    GET_WEATHER_MOVIES: (state, w_movies) => state.weatherMovies = w_movies,
    GET_MOVIE_DETAIL: (state, movieInfo) => {
      state.movieDetail = movieInfo
      // 여기서부터 좋아요 누를시에 추가하기
      state.likeCount = movieInfo.like_users_count
      if (movieInfo.like_users.includes(state.user.pk)) {
        state.isLiked = true
      } else {
        state.isLiked = false
      }
    },
    LIKE_MOVIE: (state, likeInfo) => {
      state.isLiked = likeInfo.is_liked
      state.likeCount = likeInfo.movie_like_count
    },
    // review정보
    // SET_REVIEW: (state, review) => state.movieReview = review,
    // 유저 관련 정보
    SET_TOKEN: (state, token) => state.token = token,
    SET_USER: (state, user) => {
      state.user = user 
      // console.log(state.user, user)
    },
  },
  actions: {
    getMovies({ commit }) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,

      })
        .then(res => {
          // console.log(res.data)
          const copy1 = res.data.slice()
          // 인기순 (내림차순)
          const popular = copy1.sort(function(a, b) {
            return a.popularity > b.popularity ? -1 : a.popularity < b.popularity ? 1 : 0;
          })
          console.log('popular', popular)
          commit('GET_POPULAR_MOVIES', popular)
          // 최신순 (내림차순)
          const copy2 = res.data.slice()
          const allLatest = copy2.sort(function(a, b) {
            return a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0;
          })
          const latest = allLatest.filter((movie) => {
            return movie.release_date <= today
          })
          console.log('latest', latest)
          commit('GET_LATEST_MOVIES', latest)
          // 평점순 (내림차순)
          const copy3 = res.data.slice()
          const rated = copy3.sort(function(a, b) {
            return a.vote_average > b.vote_average ? -1 : a.vote_average < b.vote_average ? 1 : 0;
          })
          commit('GET_RATED_MOVIES', rated)
          // 계절별 추천
          const copy4 = res.data.slice()
          if ([3, 4, 5].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => [10749, 18, 35, 10402].includes(genre)) || movie.title.includes('봄')
            })
            console.log('weather', result)
            commit('GET_WEATHER_MOVIES', result)
          } else if ([6, 7, 8].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => [12, 14, 28, 35, 27, 53, 80, 9648].includes(genre)) || movie.title.includes('여름')
            })
            console.log('weather', result)
            commit('GET_WEATHER_MOVIES', result)
          } else if ([9, 10, 11].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => [10402, 18, 10749].includes(genre)) || movie.title.includes('가을')
            })
            commit('GET_WEATHER_MOVIES', result)
            console.log('weather', result)
          } else if ([12, 1, 2].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => [10751, 12, 14].includes(genre)) || movie.title.includes('겨울')
            })
            console.log('weather', result)
            commit('GET_WEATHER_MOVIES', result)
          }
          
        })
        .catch(err => console.log(err))
    },
    likeMovie({ commit, dispatch, getters }, movie) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/like/${movie.id}/`,
        data:{},
        headers: getters.authHead,
      })
        .then((res) => {
          dispatch('getMovieDetail', res.data)
          commit
        })
    },
    signup({ commit, dispatch }, payload) {
      // console.log(payload)
      axios({
        url: `${API_URL}/accounts/signup/`,
        method: 'post',
        data: {...payload}
      })
        .then((res) => {
          // console.log(res.data.key)
          commit('SET_TOKEN', res.data.key)
          dispatch('getUserInfo')
          router.push('/')
        })
        .catch(err => {
          alert(JSON.stringify(err.response.data))
        })
    },
    login({ commit, dispatch }, {username, password}) {
      const payload = { username, password }
      axios({
        url: `${API_URL}/accounts/login/`,
        method: 'post',
        data: {...payload}
      })
        .then((res) => {
          // console.log(res.data.key)
          commit('SET_TOKEN', res.data.key)
          dispatch('getUserInfo')
          router.push('/')
        })
        .catch(err => {
          alert(JSON.stringify(err.response.data))
        })
    },
    logout({ commit, getters }) {
      axios({
        url: `${API_URL}/accounts/logout/`,
        method: 'post',
        headers: getters.authHead,
      })
        .then(res => {
          console.log(res)
          commit('SET_TOKEN', null)
          commit('SET_USER', null)
        })
        .catch(err => console.log(err))
    },
    getUserInfo({ commit, getters }) {
      axios({
        url: `${API_URL}/accounts/user/`,
        method: 'get',
        headers: getters.authHead,
      })
        .then(res => {
          // console.log(res.data)
          commit('SET_USER', res.data)
        })
        .catch(err => console.log(err))
    },
    getMovieDetail({ commit }, movieId) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/detail/${movieId}/`
      })
        .then(res => {
          commit('GET_MOVIE_DETAIL', res.data)
        })
        .catch(err => console.log(err))
    },
    // getReviews({ commit }, moviePk) {
    //   axios({
    //     url: `${API_URL}/movies/${moviePk}/review/`
    //   })
    //     .then( res => {
    //       console.log(2, res.data)
    //       commit
    //     })
    // },
    createReview({ dispatch, getters }, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${payload.pk}/reviews/`,
        data:{ 
          rating: payload.rating,
          content: payload.content  
        },
        headers: getters.authHead,
      })
        .then(res => {
          dispatch('getMovieDetail', res.data.movie)
          // const id = res.data.movie
          // router.go({ name: 'detail', params: { id }})          
          // commit('SET_REVIEW', res.data)
        })
    }

  },
  modules: {
  }
})
