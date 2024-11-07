import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AuthorsModules from '@/components/AuthorsModules'
import UsersModules from '@/components/UsersModules'
import SongModules from '@/components/SongModules'
import homeModules from '../components/homeModulesAdmin.vue'
import Authentication from '../components/Authentication.vue'
import users from '../components/users.json'
import HomeModulesAdmin from '../components/homeModulesAdmin.vue'
import HomeModulesUser from '../components/homeModulesUser.vue'
import PlaylistModules from '../components/PlaylistModules.vue'

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
      path: '/homeAdmin',
      name: 'homeAdmin',
      component: HomeModulesAdmin,
    },     
    {
      path: '/homeUser',
      name: 'homeUser',
      component: HomeModulesUser,
    },
    {
      path :'/Login',
      component: Authentication,
    },

  ]
})
