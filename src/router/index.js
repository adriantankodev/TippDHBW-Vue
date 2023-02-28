import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/TippabgabeView.vue')
    },
    {
      path: '/tippuebersicht',
      name: 'tippuebesicht',
      component: () => import('../views/TippuebersichtView.vue')
    },
    {
      path: '/rangliste',
      name: 'rangliste',
      component: () => import('../views/RanglisteView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
