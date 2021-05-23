import { RouteRecordRaw } from 'vue-router'

const home: Array<RouteRecordRaw> = [
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/blog/index.vue'),
    meta: {
      title: '博客管理',
    },
    children: [
      {
        path: 'list',
        name: 'BlogList',
        component: () => import('@/views/blog/lists/index.vue'),
        meta: {
          title: '博客列表'
        }
      },
      {
        path: 'class',
        name: 'BlogClass',
        component: () => import('@/views/blog/class/index.vue'),
        meta: {
          title: '博客分类'
        }
      },
      {
        path: 'add',
        name: 'BlogAdd',
        component: () => import('@/views/blog/add/index.vue'),
        meta: {
          title: '新增博客'
        }
      }
    ]
  }
]

export default home