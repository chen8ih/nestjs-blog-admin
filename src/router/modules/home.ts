import { RouteRecordRaw } from 'vue-router'

const home: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Index.vue'),
    meta: {
      title: '首页',
    }
  }
]

export default home