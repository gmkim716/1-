import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'
Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  
  state: {
    popularMovie: [],
    token: null,
    user: null,

  },
  getters: {
    popularMovies: (state) => state.popularMovie,
    isLogin(state) {
      return state.token ? true : false
    },
    authHead: (state) => ({ Authorization: `Token ${state.token}`}),
    user: (state) => state.user,

  },
  mutations: {
    GET_POPULAR_MOVIES(state, movies) {
      state.popularMovie = movies
    },
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
          // console.log(res.data)
          // 인기순
          const popular = res.data.sort(function(a, b) {
            return a.popularity > b.popularity ? -1 : a.popularity < b.popularity ? 1 : 0;
          })
          console.log(popular)
          commit('GET_POPULAR_MOVIES', popular)
          // 최신, 평점... 세분화해서 보내기
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
