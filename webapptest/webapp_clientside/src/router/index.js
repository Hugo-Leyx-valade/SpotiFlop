import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AuthorsModules from '@/components/AuthorsModules'
import UsersModules from '@/components/UsersModules'

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
    }
  ]
})
