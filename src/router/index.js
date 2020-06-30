import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { rootPath } from '@/config'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: rootPath,
  routes
})

router.beforeEach((to, form, next) => {
  if (to.meta && to.meta.title) document.title = to.meta.title
  next()
})

export default router
