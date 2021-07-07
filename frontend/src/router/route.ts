import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'homepage',
    path: '/',
    redirect: '/blog/home'
  },
  {
    path: '/resume',
    name: 'ResumePage',
    component: () => import('@/pages/resume/Index.vue')
  },
  {
    path: '/blog',
    component: () => import('@/pages/blog/Index.vue'),
    redirect: '/blog/home',
    children: [
      {
        path: '/blog/home',
        name: 'BlogHome',
        component: () => import('@/pages/blog/home/Index.vue')
      }
    ]
  }
]

export default routes
