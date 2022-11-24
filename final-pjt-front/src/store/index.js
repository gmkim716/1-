import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

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
    upComingMovies: [],
    weatherMovies: [],
    genres: null,
    movieDetail: null,
    reviews:null,
    relatedYoutebe: null,
    // movieReview: null,
    isLiked: null,
    isWatched: null,
    isBookmarked: null,
    likeCount: null,
    watchedCount: null,
    bookmarkedCount: null,
    token: null,
    user: null,
    profile:null,
    likeReview: null,
    hateReview: null,
    results: null,
    ostquery: null,
    spoilerquery: null,
  },
  getters: {
    // test용으로 slice()적용해 놓음
    popularMovies: (state) => state.popularMovie,
    latestMovies: (state) => state.latestMovies,
    ratedMovies: (state) => state.ratedMovies,
    weatherMovies: (state) => state.weatherMovies,
    upComingMovies: (state) => state.upComingMovies,
    isLogin(state) {
      return state.token ? true : false
    },
    relatedYoutebe: (state) => state.relatedYoutebe,
    authHead: (state) => ({ Authorization: `Token ${state.token}`}),
    user: (state) => state.user,
    movie: (state) => state.movieDetail,
    isLiked: (state) => state.isLiked,
    isWatched: (state) => state.isWatched,
    isBookmarked: (state) => state.isBookmarked,
    likeCount: (state) => state.likeCount,
    watchedCount: (state) => state.watchedCount,
    bookmarkedCount: (state) => state.likeCount,
    reviews: (state) => state.reviews,
    profile: (state) => state.profile,
    likeReview: (state) => state.likeReview,
    hateReview: (state) => state.hateReview,
    results: (state) => state.results,
    genres: (state) => state.genres,
    ostquery: (state) => state.ostquery,
    spoilerquery: (state) => state.spoilerquery,
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
      state.genres = state.movieDetail.genres
      state.reviews = state.movieDetail.review_set.reverse()
      state.likeReview = state.reviews.like_users
      // 여기서부터 좋아요 누를시에 추가하기
      if (movieInfo.like_users.includes(state.user.id)) {
        state.isLiked = true
      } else {
        state.isLiked = false
      }
      state.likeCount = movieInfo.like_users_count
      // 시청 표시를 누를시
      if (movieInfo.watched_users.includes(state.user.id)) {
        state.isWatched = true
      } else {
        state.isWatched = false
      }
      state.watchedCount = movieInfo.watched_users_count
      // 북마크를 누를시
      if (movieInfo.bookmarked_users.includes(state.user.id)) {
        state.isBookmarked = true
      } else {
        state.isBookmarked = false
      }
      state.bookmarkedCount = movieInfo.bookmarked_users_count
      // 유튜브 검색 쿼리 저장
      state.ostquery = state.movieDetail.title.concat(' 영화 soundTrack OST')
      state.spoilerquery = state.movieDetail.title.concat(' 영화 결말포함')
      
    },
    LIKE_MOVIE: (state, likeInfo) => {
      state.isLiked = likeInfo.is_liked
      state.likeCount = likeInfo.movie_like_count
    },
    GET_UPCOMING_MOVIES : (state, upComing) => state.upComingMovies = upComing,
    SET_YOUTUBE_LIST: (state, relatedYoutebe) => {
      state.relatedYoutebe = relatedYoutebe
    },
    RESET_DETAIL: (state) => {
      state.movieDetail = null
      state.reviews = null
      state.isLiked = null
      state.likeCount = null
      state.profile = null
      state.ostquery = null
      state.spoilerquery = null
    },
    // review정보
    LIKE_REVIEW: (state, likeReview) => state.likeReview = likeReview,
    HATE_REVIEW: (state, hateReview) => state.hateReview = hateReview, 
    // SET_REVIEW: (state, review) => state.movieReview = review,
    // 유저 관련 정보
    SET_TOKEN: (state, token) => state.token = token,
    SET_USER: (state, user) => state.user = user,
    GET_PROFILE: (state, profile) => state.profile = profile,
    SEARCH_ENTER: (state, results) => state.results = results,
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
          // 인기순 (내림차순) - 40개만 내리기
          const popular = copy1.sort(function(a, b) {
            return a.popularity > b.popularity ? -1 : a.popularity < b.popularity ? 1 : 0;
          })
          const popularMovies = popular.slice(0,100)
          console.log('popular', popularMovies)
          
          commit('GET_POPULAR_MOVIES', popularMovies)
          // 최신순 (내림차순)
          const copy2 = res.data.slice()
          const allLatest = copy2.sort(function(a, b) {
            return a.release_date > b.release_date ? -1 : a.release_date < b.release_date ? 1 : 0;
          })
          const latest = allLatest.filter((movie) => {
            return movie.release_date <= today
          })
          const latestMovies = latest.slice(0,100)
          // 상영예정 (인기 순)
          const upComing = allLatest.filter((movie) => {
            return movie.release_date > today
          })

          console.log('latest', latestMovies)
          console.log('upcoming', upComing)
          commit('GET_LATEST_MOVIES', latestMovies)
          commit('GET_UPCOMING_MOVIES', upComing.reverse())
          // 평점순 (내림차순)
          const copy3 = res.data.slice()
          const rated = copy3.sort(function(a, b) {
            return a.vote_average > b.vote_average ? -1 : a.vote_average < b.vote_average ? 1 : 0;
          })
          const filteredRated = rated.filter(movie => {
            return movie.vote_count >= 110
          })
          const ratedMovies = filteredRated.slice(0,100)
          console.log('rated', ratedMovies)
          commit('GET_RATED_MOVIES', ratedMovies)
        })
        .catch(err => console.log(err))
    },
    getWeatherMovies({ commit }) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
      })
        .then(res => {
          // 계절별 추천
          const copy4 = res.data.slice()
          if ([3, 4, 5].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => ['로맨스', '드라마', '코미디', '음악'].includes(genre.name)) || movie.title.includes('봄') || movie.title.includes('꽃') 
            })
            const weatherMovie = _.sampleSize(result, 100)
            console.log('weather', weatherMovie)
            commit('GET_WEATHER_MOVIES', weatherMovie)
          } else if ([6, 7, 8].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => ['모험', '판타지', '액션', '코미디', '공포', '스릴러', '범죄', '미스터리'].includes(genre.name)) || movie.title.includes('여름') || movie.title.includes('바다') || movie.title.includes('귀신')|| movie.title.includes('해변')
            })
            const weatherMovie = _.sampleSize(result, 100)
            console.log('weather', weatherMovie)
            commit('GET_WEATHER_MOVIES', weatherMovie)
          } else if ([9, 10, 11].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => ['가족' ,'음악', '드라마', '로맨스'].includes(genre.name)) || movie.title.includes('가을') || movie.title.includes('낙엽') || movie.title.includes('이별')
            })
            const weatherMovie = _.sampleSize(result, 100)
            console.log('weather', weatherMovie)
            commit('GET_WEATHER_MOVIES', weatherMovie)
          } else if ([12, 1, 2].includes(month)) {
            const result = copy4.filter((movie) => {
              return movie.genres.some(genre => ['가족', '모험', '판타지'].includes(genre.name)) || movie.title.includes('겨울') || movie.title.includes('눈') || movie.title.includes('캐럴') || movie.title.includes('해리 포터') || movie.title.includes('나홀로')
            })
            const weatherMovie = _.sampleSize(result, 100)
            console.log('weather', weatherMovie)
            commit('GET_WEATHER_MOVIES', weatherMovie)
          }          
        })
      },
    // 좋아요 기능
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
    watchedMovie({ commit, dispatch, getters }, movie) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/watched/${movie.id}/`,
        data:{},
        headers: getters.authHead,
      })
        .then(() => {
          dispatch('getMovieDetail', movie.id)
          commit
        })
        .catch(err => console.log(err))
    },
    bookmarkedMovie({ commit, dispatch, getters }, movie) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/bookmarked/${movie.id}/`,
        data:{},
        headers: getters.authHead,
      })
        .then(() => {
          dispatch('getMovieDetail', movie.id)
          commit
        })
        .catch(err => console.log('에러발생', err))
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
          router.push('/')          
        })
        .catch(err => console.log(err))
    },
    getUserInfo({ dispatch, getters }) {
      axios({
        url: `${API_URL}/accounts/user/`,
        method: 'get',
        headers: getters.authHead,
      })
        .then(res => {
          // console.log('유저정보',res.data)
          dispatch('getUserDetail', res.data.pk)
        })
        .catch(err => console.log(err))
    },
    getUserDetail({ commit, state }, userPk) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/${userPk}/`,
      })
        .then(res =>{
          console.log('유저',res.data)
          if(!state.user) {
            commit('SET_USER', res.data)
            router.push('/')
          }
          commit('SET_USER', res.data)
        })
        .catch(err => console.log('getuserdetailerr:', err))
    },
    getProfile({ commit }, userPk) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/${userPk}/`,
      })
        .then(res =>{
          // console.log('유저',res.data)
          commit('GET_PROFILE', res.data)
        })
    },
    follow({ commit, getters }, userPk) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/${userPk}/follow/`,
        headers: getters.authHead,
        data: {}
      })
        .then(res => {
          // console.log('팔로우',res)
          commit('GET_PROFILE', res.data)
        })
    },
    getMovieDetail({ commit }, movieId) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/detail/${movieId}/`
      })
        .then(res => {
          console.log(res.data)
          commit('GET_MOVIE_DETAIL', res.data)
        })
        .catch(err => console.log(err))
    },
    createReview({ dispatch, getters }, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/${payload.pk}/reviews/`,
        data:{ 
          rating: payload.rating,
          content: payload.content,
        },
        headers: getters.authHead,
      })
        .then(res => {
          console.log(res.data)
          dispatch('getMovieDetail', res.data.movie)
          // const id = res.data.movie
          // router.go({ name: 'detail', params: { id }})          
          // commit('SET_REVIEW', res.data)
        })
    },

    deleteReview({ dispatch, getters }, payload) {
      const reviewId = payload.reviewId
      const movieId = payload.movieId
      // console.log(`${API_URL}/movies/${movieId}/reviews/${reviewId}/delete/`)
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movieId}/reviews/${reviewId}/delete/`,
        data: {},
        headers: getters.authHead
      })
        .then(res => {
          console.log('good', res)
          dispatch('getMovieDetail', res.data.id)
        })
        .catch(err => console.log('deleteReviewErr:', err))
    },

    likeReview({ commit, dispatch, getters }, reviewPk) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/review/like/${reviewPk}/`,
        data: {},
        headers: getters.authHead,    // post
      })
        .then(res => {
          commit('LIKE_REVIEW', res.data)
          dispatch('getMovieDetail', getters.movie.id )
        })
        .catch(err => console.log('err', err))
    },
    hateReview({ commit, dispatch, getters }, reviewPk) {
      axios({
        method: 'post',
        url: `${API_URL}/movies/review/hate/${reviewPk}/`,
        data: {},
        headers: getters.authHead,
      })
        .then(res => {
          commit('HATE_REVIEW', res.data)     // 동작1: state의 hateReview 변경
          dispatch('getMovieDetail', getters.movie.id)  // 동작2: isHated 상태 변화, count()
        })
        .catch(err => console.log('err', err))
    
    },
    searchEnter({ commit }, query) {
      axios({
        url: `http://127.0.0.1:8000/movies/searchEnter/${query}`,
        method: 'get'
      })
        .then(res => {
          commit('SEARCH_ENTER', res.data)
          router.push({name: 'search', params: {query}})
        })
        .catch(err => console.log(err))
    },
  },
  modules: {
  }
})
