import createPopover from '@/components/popover/index'
import Search from '@/components/search/Search.vue'
import { ref } from 'vue'
import type { PopoverInstance } from '@/components/popover/index'
import type { SearchProps } from '@/components/search/props'
import type { App } from 'vue'

Search.install = function (_Vue: App) {
  _Vue.component(Search.name, Search)
}

export function useSearch() {
  const instance = ref<PopoverInstance>()
  const createSearch = createPopover(Search, {
    customOnPopoverMaskClick: (done: Function) => {
      console.log('customMaskClick')
      done()
    }
  })
  function handleSearchClick(evt: Event) {
    evt.preventDefault()
    instance.value = createSearch<SearchProps>({
      name: 'searchName'
    })
  }
  return {
    handleSearchClick,
    createSearch,
    instance
  }
}

export default Search
