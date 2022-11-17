import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'
Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()
const today = year +'-'+ month +'-'+ day

export default new Vuex.Store({
  
  state: {
    popularMovie: [],
    latestMovies: [],
    ratedMovies: [],
    token: null,
    user: null,

  },
  getters: {
    // test용으로 slice()적용해 놓음
    popularMovies: (state) => state.popularMovie.slice(0,6),
    latestMovies: (state) => state.latestMovies.slice(0,6),
    ratedMovies: (state) => state.ratedMovies.slice(0,6),
    isLogin(state) {
      return state.token ? true : false
    },
    authHead: (state) => ({ Authorization: `Token ${state.token}`}),
    user: (state) => state.user,

  },
  mutations: {
    // 영화 관련 정보
    GET_POPULAR_MOVIES(state, p_movies) {
      state.popularMovie = p_movies
    },
    GET_LATEST_MOVIES: (state, l_movies) => state.latestMovies = l_movies,
    GET_RATED_MOVIES: (state, r_movies) => state.ratedMovies = r_movies,
    // 유저 관련 정보
    SET_TOKEN: (state, token) => state.token = token,
    SET_USER: (state, user) => {
      state.user = user 
      console.log(state.user, user)
    },

  },
  actions: {
    getMovies({ commit }) {
      axios({
        url: 'http://127.0.0.1:8000/movies/api/v1/'
      })
        .then(res => {
          console.log(res.data)
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
          console.log('rated', rated)
          commit('GET_RATED_MOVIES', rated)
        })
        .catch(err => console.log(err))
    },
    signup({ commit, dispatch }, payload) {
      // console.log(payload)

      axios({
        url: `${API_URL}/accounts/signup/`,
        method: 'post',
        data: {...payload}
      })
        .then((res) => {
          console.log(res.data.key)
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
          console.log(res.data.key)
          commit('SET_TOKEN', res.data.key)
          dispatch('getUserInfo')
          router.push('/')
        })
        .catch(err => {
          alert(JSON.stringify(err.response.data))
        })
    },
    // logout({ commit, getters }) {
    //   axios({
    //     url: `${API_URL}/accounts/logout/`,
    //     method: 'post',
    //     headers: getters.authHead,
    //   })
    //     .then(res => {
    //       console.log(res)
    //       commit('SET_TOKEN', null)
    //       commit('SET_USER', null)
    //     })
    //     .catch(err => console.log(err))
    // },
    getUserInfo({ commit, getters }) {
      axios({
        url: `${API_URL}/accounts/user/`,
        method: 'get',
        headers: getters.authHead,
      })
        .then(res => {
          console.log('안녕')
          console.log(res.data)
          commit('SET_USER', res.data)
        })
        .catch(err => console.log(err))
    },

  },
  modules: {
  }
})
