import Vue from 'vue'
import VueRouter from 'vue-router'
import SignupView from '../views/SignupView.vue'
import ArticleView from '@/views/ArticleView'
import LoginView from '@/views/LoginView'
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ArticleView',
    component: ArticleView
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },
  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
