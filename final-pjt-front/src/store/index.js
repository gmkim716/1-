import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popularMovie: [],
  },
  getters: {
    popularMovies: (state) => state.popularMovie
  },
  mutations: {
    GET_POPULAR_MOVIES(state, movies) {
      state.popularMovie = movies
    }
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
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
