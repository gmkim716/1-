import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import LastestMovieView from '@/views/LastestMovieView'
import PopularMovieView from '@/views/PopularMovieView'
import RecommendView from '@/views/RecommendView'
import UserLikeView from '@/views/UserLikeView'
import SignupView from '@/views/SignupView'
import LoginView from '@/views/LoginView'
import DetailView from '@/views/DetailView'
import ProfileView from '@/views/ProfileView'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/lastest',
    name: 'LastestMovieView',
    component: LastestMovieView
  },
  {
    path: '/popular',
    name: 'PopularMovieView',
    component: PopularMovieView
  },
  {
    path: '/recommend',
    name: 'RecommendView',
    component: RecommendView
  },
  {
    path: '/userlike',
    name: 'UserLikeView',
    component: UserLikeView
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/profile/:userId',
    name: 'ProfileView',
    component: ProfileView,

  },
  {
    path: '/:id',
    name: 'detail',
    component: DetailView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
