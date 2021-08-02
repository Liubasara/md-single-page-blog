import createPopover from '@/components/popover/index'
import Search from '@/components/search/Search.vue'
import {
  getAllPostBySearch,
  getAllTagsBySearch,
  getAllCatesBySearch,
  getAllPostsByTags,
  getAllPostsByCate
} from '@/utils/articleUtils'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import type { PopoverInstance } from '@/components/popover/index'
import type { SearchProps, SearchEventHandler } from '@/components/search/props'
import type { App } from 'vue'

Search.install = function (_Vue: App) {
  _Vue.component(Search.name, Search)
}

export function useSearch() {
  const instance = ref<PopoverInstance>()
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  store.dispatch('article/fetchAllContents')
  const searchKeyWord = ref('')
  const searchPlaceHolder = ref('')
  const searchArticleItemsIsLoading = computed(
    () => !store.state.article.allContentsLoaded
  )
  const searchArticleItems = computed(() => {
    let allContents: Array<articleType> = store.state.article.allContents
    if (route.name === 'BlogTags') {
      const routeTags = (route.query?.tags as string)?.split?.(',') || []
      searchPlaceHolder.value =
        routeTags.length === 0
          ? '在所有标签的文章中进行搜索'
          : `在标签含有 ${routeTags.join(',')} 的文章中搜索`
      if (routeTags.length !== 0) {
        return getAllPostBySearch(
          getAllPostsByTags(allContents, routeTags),
          searchKeyWord.value
        )
      }
      return getAllPostBySearch(allContents, searchKeyWord.value)
    } else if (route.name === 'BlogCate') {
      const routeCate = (route.query?.cate as string) || ''
      searchPlaceHolder.value = !routeCate.trim()
        ? '在所有分类的文章中进行搜索'
        : `在分类为 ${routeCate} 的文章中搜索`
      if (routeCate.trim()) {
        return getAllPostBySearch(
          getAllPostsByCate(allContents, routeCate),
          searchKeyWord.value
        )
      }
      return getAllPostBySearch(allContents, searchKeyWord.value)
    } else {
      searchPlaceHolder.value = ''
      if (!searchKeyWord.value.trim()) {
        // 文章限定初始只显示 3 个
        return store.state.article.directory.slice(0, 3)
      }
      return getAllPostBySearch(allContents, searchKeyWord.value)
    }
  })
  const searchTagItems = computed(() => {
    if (route.name === 'BlogTags' || route.name === 'BlogCate') {
      return []
    }
    if (!searchKeyWord.value.trim()) {
      return store.state.article.tags.allTags
    }
    return getAllTagsBySearch(
      store.state.article.directory,
      searchKeyWord.value
    ).allTags
  })
  const searchCateItems = computed(() => {
    if (route.name === 'BlogTags' || route.name === 'BlogCate') {
      return []
    }
    if (!searchKeyWord.value.trim()) {
      return store.state.article.cates.allCates
    }
    return getAllCatesBySearch(
      store.state.article.directory,
      searchKeyWord.value
    ).allCates
  })

  const createSearch = createPopover(Search, {
    // 自定义点击遮罩层的方法, 入参 done 为关闭弹出层函数
    customOnPopoverMaskClick: (done: Function) => {},
    // 自定义关闭函数
    customCloseFunc: (done: Function) => {
      searchKeyWord.value = ''
      searchPlaceHolder.value = ''
      done()
    }
  })

  const showSearchDialog = async () => {
    instance.value = createSearch<SearchProps & SearchEventHandler>({
      articleItems: searchArticleItems,
      tagItems: searchTagItems,
      cateItems: searchCateItems,
      keywordRef: searchKeyWord,
      articleItemsIsLoading: searchArticleItemsIsLoading,
      searchPlaceHolder: searchPlaceHolder,
      onArticleClick: (data: articleType | articleTypeDirectory) => {
        router.push({ name: 'BlogPost', params: { name: data.name } })
        instance.value?.remove?.()
      },
      onTagClick: (data: string) => {
        router.push({ name: 'BlogTags', query: { tags: data } })
        instance.value?.remove?.()
      },
      onCateClick: (data: string) => {
        router.push({ name: 'BlogCate', query: { cate: data } })
        instance.value?.remove?.()
      }
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
