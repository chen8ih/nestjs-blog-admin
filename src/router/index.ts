import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const _createRouter = () => createRouter({
  history: createWebHashHistory(),
  routes
})
