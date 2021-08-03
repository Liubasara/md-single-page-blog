import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './route'

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0
    }
  }
})
