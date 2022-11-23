import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import LastestMovieView from '@/views/LastestMovieView'
import PopularMovieView from '@/views/PopularMovieView'
import RecommendView from '@/views/RecommendView'
import LibraryView from '@/views/LibraryView'
import SignupView from '@/views/SignupView'
import LoginView from '@/views/LoginView'
import DetailView from '@/views/DetailView'
import ProfileView from '@/views/ProfileView'
import SearchListView from '@/views/SearchListView'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(() => {
        return window.location.reload()
    })
};

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
    path: '/library',
    name: 'LibraryView',
    component: LibraryView
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
    path: '/profile/:userPk',
    name: 'ProfileView',
    component: ProfileView,

  },
  {
    path: '/search',
    name: 'search',
    component: SearchListView
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