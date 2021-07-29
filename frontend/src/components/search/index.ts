import createPopover from '@/components/popover/index'
import Search from '@/components/search/Search.vue'
import { ref, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import type { PopoverInstance } from '@/components/popover/index'
import type { SearchProps } from '@/components/search/props'
import type { App } from 'vue'

Search.install = function (_Vue: App) {
  _Vue.component(Search.name, Search)
}

export function useSearch() {
  const instance = ref<PopoverInstance>()
  const store = useStore()
  const directory = store.state.article.directory
  const searchData = computed(() => store.state.searchData)
  const commitSearchData = (_searchData: string = '') => {
    store.commit('setSearchData', _searchData)
  }

  const createSearch = createPopover(Search, {
    // 自定义点击遮罩层的方法, 入参 done 为关闭弹出层函数
    customOnPopoverMaskClick: (done: Function) => {}
  })
  function handleSearchClick(evt: Event) {
    evt.preventDefault()

    setTimeout(() => {
      commitSearchData('wowow')
    }, 1000)
    instance.value = createSearch<SearchProps>({
      name: searchData,
      articleItems: []
    })
  }
  return {
    handleSearchClick,
    createSearch,
    instance
  }
}

export default Search
