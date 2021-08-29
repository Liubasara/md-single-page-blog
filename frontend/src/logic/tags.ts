import { computed } from 'vue'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

export const navigateToTagsPage = (
  tag: string,
  router: Router,
  route: RouteLocationNormalizedLoaded
) => {
  if (!tag) {
    router.push({ name: 'BlogTags' })
    return
  }
  const routeTags = computed(() =>
    decodeURIComponent((route.query?.tags as string) || '')
  )
  const routeTagsArr =
    routeTags.value !== '' && routeTags.value.split(',').length > 0
      ? routeTags.value.split(',')
      : []
  const tagIndex = routeTagsArr.indexOf(tag)
  if (~tagIndex) {
    routeTagsArr.splice(tagIndex, 1)
  } else {
    routeTagsArr.push(tag)
  }

  const tagQuery = encodeURIComponent(routeTagsArr.join(',')) || undefined
  router.push({ name: 'BlogTags', query: { tags: tagQuery } })
}

export const isTagActive = (
  tag: string,
  route: RouteLocationNormalizedLoaded
): boolean => {
  const routeTags = computed(() =>
    decodeURIComponent((route.query?.tags as string) || '')
  )
  return !!~routeTags.value.indexOf(tag)
}
