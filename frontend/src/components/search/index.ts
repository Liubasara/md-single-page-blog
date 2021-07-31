import createPopover from '@/components/popover/index'
import Search from '@/components/search/Search.vue'
import { getAllPostBySearch, getAllTagsBySearch, getAllCatesBySearch } from '@/utils/articleUtils'
import { ref, computed } from 'vue'
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
  store.dispatch('article/fetchAllContents')
  const searchKeyWord = ref('')
  const searchArticleItemsIsLoading = computed(() => !store.state.article.allContentsLoaded)
  const searchArticleItems = computed(() => {
    if (!searchKeyWord.value.trim()) {
      // 文章限定初始只显示 3 个
      return store.state.article.directory.slice(0, 3)
    }
    return getAllPostBySearch(store.state.article.allContents as Array<articleType>, searchKeyWord.value)
  })
  const searchTagItems = computed(() => {
    if (!searchKeyWord.value.trim()) {
      return store.state.article.tags.allTags
    }
    return getAllTagsBySearch(store.state.article.directory, searchKeyWord.value).allTags
  })
  const searchCateItems = computed(() => {
    if (!searchKeyWord.value.trim()) {
      return store.state.article.tags.allTags
    }
    return getAllCatesBySearch(store.state.article.directory, searchKeyWord.value).allCates
  })

  const createSearch = createPopover(Search, {
    // 自定义点击遮罩层的方法, 入参 done 为关闭弹出层函数
    customOnPopoverMaskClick: (done: Function) => {}
  })

  const showSearchDialog = async () => {
    instance.value = createSearch<SearchProps>({
      articleItems: searchArticleItems,
      tagItems: searchTagItems,
      cateItems: searchCateItems,
      keywordRef: searchKeyWord,
      articleItemsIsLoading: searchArticleItemsIsLoading
    })
  }
  function handleSearchClick(evt: Event) {
    evt.preventDefault()
    showSearchDialog()
  }
  return {
    handleSearchClick,
    createSearch,
    instance
  }
}

export default Search
