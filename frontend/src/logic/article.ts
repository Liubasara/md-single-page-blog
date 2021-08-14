import type { Router } from 'vue-router'

export const navigateToArticle = (name: string, router: Router) => {
  router.push({ name: 'BlogPost', params: { name: name } })
}
