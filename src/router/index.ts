import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// import { Meta } from '@/@types'
// import { store } from '@/store'
import Layout from '@/layouts/Main.vue'

// 自动加载模块中的路由模块
const routesModules = import.meta.globEager('./modules/*.ts')

export const customRoutes = Object.keys(routesModules).reduce<RouteRecordRaw[]>(
  (pre, k) => [...pre, ...routesModules[k].default],
  []
)

const whiteUrls = ['/login', '/404']

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页'
    },
    children: [...customRoutes]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/register.vue'),
    meta: {
      title: '注册'
    }
  }
  // {
  //   path: '*',
  //   redirect: '/404'
  // }
]

console.log(constantRoutes)

const _createRouter = () => createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

let router = _createRouter()

// router.beforeEach((to, from, next) => {
//   if (!to.matched.length) {
//     router.push({
//       path: '/404'
//     })
//   } else {
//     if (!whiteUrls.some(item => item === to.path)) {
//       if (store.getters.userToken) {
//         // 设置相关信息
//       }
//     } else {
//       router.push({
//         path: '/login'
//       })
//     }
//   }
//   next()
// })

export function resetRouter() {
  router = _createRouter()
}

export default router
