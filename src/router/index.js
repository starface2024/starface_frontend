/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import { checkTokenExpiration } from '@/plugins/auth'

import App from './modules/app'
import Auth from './modules/auth'

// Error Page
import PageNotFound from '../modules/ErrorPages/Error404Page.vue'

const baseRoutes = [
  // Route for Page Not found
  { path: '/:pathMatch(.*)', component: PageNotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes.concat(App, Auth),
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

router.beforeEach((to, from, next) => {
  var isLoggedIn = store.getters['auth/getAuthenticated']
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    checkTokenExpiration()
    // Check if the user is authenticated
    if (!isLoggedIn) {
      // Redirect to the auth page
      next({ path: '/auth', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})
// Navigation Guards
// router.beforeEach(() => {
 
// })
export default router
