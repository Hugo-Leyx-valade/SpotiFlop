import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AuthorsModules from '@/components/AuthorsModules'
import UsersModules from '@/components/UsersModules'
import SongModules from '@/components/SongModules'
import Authentication from '../components/Authentication.vue'
import AdminPanel from '../components/AdminPanel.vue'
import PlaylistModules from '../components/PlaylistModules.vue'
import GenreModule from '../components/GenreModule.vue'
import AdminDashboard from '../components/AdminDashboard.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/authors',
      redirect: '/authors/list/all'
    },
    {
      path: '/authors/:action/:id',
      name: 'authors',
      component: AuthorsModules,
      props:  true,
    }, 
    {
      path: '/users',
      redirect: '/users/list/all'
    },
    {
      path: '/users/:action/:id',
      name: 'users',
      component: UsersModules,
      props:  true,
    },
    {
      path: '/songs',
      redirect: '/songs/list/all'
    },
    {
      path: '/songs/:action/:id',
      name: 'songs',
      component: SongModules,
      props:  true,
    },
    {
      path: '/playlist',
      redirect: '/playlist/list/all'
    },
    {
      path: '/playlist/:action/:id',
      name: 'playlist',
      component: PlaylistModules,
      props:  true,
    },

    {
      path: '/genres',
      redirect: '/genres/list/all'
    },
    {
      path: '/genres/:action/:id',
      name: 'genres',
      component: GenreModule,
      props:  true,
    },
    {
      path :'/authentication',
      redirect: '/authentication/option',
      component: Authentication,
    },
    {
      path:"/authentication/:action",
      component: Authentication,
      props: true,
    },
    {
      path :'/adminPanel',
      component: AdminPanel,
    },
    {
      path: '/panel',
      name: 'panel',
      component: AdminDashboard,
    },
  ]
})
