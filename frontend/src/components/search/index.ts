import createPopover from '@/components/popover/index'
import Search from '@/components/search/Search.vue'
import type { PopoverInstance } from '@/components/popover/index'
import { ref } from 'vue'
import type { App } from 'vue'

Search.install = function (_Vue: App) {
  _Vue.component(Search.name, Search)
}

export function useSearch() {
  const instance = ref<PopoverInstance>()
  const createSearch = createPopover(Search)
  function handleSearchClick(evt: Event) {
    evt.preventDefault()
    instance.value = createSearch()
  }
  return {
    handleSearchClick,
    createSearch,
    instance
  }
}

export default Search
