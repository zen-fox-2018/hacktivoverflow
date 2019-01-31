import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: : "user" */ './views/Users.vue'),
      children: [
        {
          path: 'login',
          component: () => import(/* webpackChunkName: : "login" */ './components/Login.vue')
        },
        {
          path: 'register',
          component: () => import(/* webpackChunkName: : "register" */ './components/Register.vue')
        }
      ]
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue'),
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName : "questiondetail" */ './components/ListAllQuestions.vue')
        },
        {
          path: ':id',
          component: () => import(/* webpackChunkName : "questiondetail" */ './components/QuestionDetail.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
