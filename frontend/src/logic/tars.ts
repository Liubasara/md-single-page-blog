import { computed } from 'vue'
import { getFirstDateOfMonth, getLastDateOfMonth } from '@/utils/date'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

export const navigateToTarsDetailPage = (time: string, router: Router) => {
  router.push({ name: 'BlogTarByTime', params: { time } })
}

export const isTarActive = (
  time: string,
  route: RouteLocationNormalizedLoaded
): boolean => {
  const firstDateOfMonth = +getFirstDateOfMonth(+time)
  const lastDateOfMonth = +getLastDateOfMonth(+time)
  const routeTime = computed(() => route.params.time as string)
  return (
    +routeTime.value >= firstDateOfMonth && +routeTime.value <= lastDateOfMonth
  )
}
