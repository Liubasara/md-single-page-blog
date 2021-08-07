import { computed } from 'vue'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

export const navigateToCatesPage = (
  cate: string,
  router: Router
) => {
  const cateQuery = encodeURIComponent(cate) || undefined
  router.push({ name: 'BlogCate', query: { cate: cateQuery } })
}

export const isCateActive = (
  cate: string,
  route: RouteLocationNormalizedLoaded
): boolean => {
  const routeCate = computed(() =>
    decodeURIComponent((route.query?.cate as string) || '')
  )
  return !!~routeCate.value.indexOf(cate)
}
