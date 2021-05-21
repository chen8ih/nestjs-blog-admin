import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

const _createRouter = () => createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

let router = _createRouter()

export function resetRouter() {
  router = _createRouter()
}

export default router
