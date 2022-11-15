import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'
Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    token: null,
    // 현재 로그인 해 있는 유저정보
    user: null,
    articles: [],
    article: {},
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    authHead: (state) => ({ Authorization: `Token ${state.token}`}),
    // 현재 로그인 해 있는 유저정보
    user: (state) => state.user,
    articles: (state) => state.articles,
    article: (state) => state.article,
    isAuthor: (state) => state.user?.username === state.article.username,
  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_USER: (state, user) => state.user = user,
    GET_ARTICLES: (state, articles) => state.articles = articles,
    SET_ARTICLE : (state, article) => state.article = article
  },
  actions: {
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
          router.push({ name: 'ArticleView'})
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
    // 로그인이 됐을 때 호출해서 받아오기 => 현재 누구인지
    getUserInfo({ commit, getters }) {
      axios({
        url: `${API_URL}/accounts/user/`,
        method: 'get',
        headers: getters.authHead,
      })
        .then(res => {
          console.log(res)
          commit('SET_USER', res.data)
        })
        .catch(err => console.log(err))
    },
    createArticle( { getters }, payload) {
      axios({
        url: `${API_URL}/api/v1/articles/`,
        method: 'post',
        data: { ...payload },
        headers: getters.authHead,
      })
        .then(res => {
          console.log(res)
          router.push( { name: 'ArticleView' })

        })
        .catch(err => console.log(err))
    },
    getArticles( { commit }){
      axios({
        url: `${API_URL}/api/v1/articles/`,
      })
        .then(res => {
          console.log(res)
          commit('GET_ARTICLES', res.data)
        })
        .catch(err => console.log(err))
    },
    // 현재 보는 디테일 페이지를 알아야 update가능
    getArticleDetail({ commit }, articleId) {
      axios({
        url: `${API_URL}/api/v1/articles/${articleId}/`,
      })
        .then(res => {
          console.log(res)
          commit('SET_ARTICLE', res.data)
        })
        .catch(err => console.log(err))
    }
  },
  modules: {
  }
})
