import type { RouteRecordRaw } from 'vue-router'
import idle from '@/utils/idle'

idle(function prefetchPage() {
  return Promise.all([
    import('@/pages/blog/post/Index.vue'),
    import('@/pages/blog/tags/Index.vue'),
    import('@/pages/blog/cate/Index.vue'),
    import('@/pages/blog/tar/Index.vue')
  ])
})

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
      },
      {
        path: '/blog/post/:name',
        name: 'BlogPost',
        component: () => import('@/pages/blog/post/Index.vue')
      },
      {
        path: '/blog/tags',
        name: 'BlogTags',
        component: () => import('@/pages/blog/tags/Index.vue')
      },
      {
        path: '/blog/cate',
        name: 'BlogCate',
        component: () => import('@/pages/blog/cate/Index.vue')
      },
      {
        path: '/blog/tar',
        name: 'BlogTar',
        component: () => import('@/pages/blog/tar/Index.vue')
      },
      {
        // 根据指定月份归档
        path: '/blog/tar/:time',
        name: 'BlogTarByTime',
        component: () => import('@/pages/blog/tar/Index.vue')
      }
    ]
  }
]

export default routes
