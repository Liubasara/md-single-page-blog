import { computed } from 'vue'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

export const navigateToTarsDetailPage = (time: string, router: Router) => {
  router.push({ name: 'BlogTarByTime', params: { time } })
}

export const isTarActive = (
  time: string,
  route: RouteLocationNormalizedLoaded
): boolean => {
  const routeTime = computed(() => route.params.time)
  return routeTime.value ? !!~routeTime.value.indexOf(time) : false
}
