import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { validateToken } from '../auth'

const guardRoute = async (to, from, next) => {
  let val = await validateToken(JSON.parse(localStorage.getItem('token')))
  if (val.success) {
    next()
  } else {
    next('/login/?redirect=' + to.path)
  }
}

const loggedin = async (to, from, next) => {
  let val = await validateToken(JSON.parse(localStorage.getItem('token')))
  if (val.success) {
    next('/')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/tabelle',
      name: 'Tabelle',
      component: () => import('../views/TableView.vue')
    },
    {
      path: '/tippabgabe',
      name: 'tippabgabe',
      beforeEnter: guardRoute,
      component: () => import('../views/TippabgabeView.vue')
    },
    {
      path: '/tippuebersicht',
      name: 'tippuebesicht',
      beforeEnter: guardRoute,
      component: () => import('../views/TippuebersichtView.vue')
    },
    {
      path: '/rangliste',
      name: 'rangliste',
      beforeEnter: guardRoute,
      component: () => import('../views/RanglisteView.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: loggedin,
      component: () => import('../views/userManagement/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: loggedin,
      component: () => import('../views/userManagement/RegisterView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: guardRoute,
      component: () => import('../views/userManagement/ProfileView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
