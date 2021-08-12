import createPopover from '@/components/popover/index'
import Search from '@/components/search/Search.vue'
import SearchProps from '@/components/search/props'
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {
  getAllPostBySearch,
  getAllTagsBySearch,
  getAllCatesBySearch,
  getAllPostsByTags,
  getAllPostsByCate
} from '@/utils/articleUtils'
import type { PopoverInstance } from '@/components/popover/index'
import type { SearchEventHandler } from '@/components/search/props'
import type { App, Ref, ExtractPropTypes } from 'vue'
import type { Store } from 'vuex'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import type { StoreArticleModuleState } from '@/store/modules/article'

Search.install = function (_Vue: App) {
  _Vue.component(Search.name, Search)
}

// type SearchPropsType = ExtractPropTypes<typeof SearchProps> & SearchEventHandler

export const getSearchProps = <T extends StoreArticleModuleState>(
  store: Store<T>,
  route: RouteLocationNormalizedLoaded,
  router: Router,
  instance: Ref<PopoverInstance>
) => {
  const keyword = ref('')
  const searchPlaceHolder = ref('')
  function getArticleItems() {
    let allContents: Array<articleType> = store.state.article.allContents
    if (route.name === 'BlogTags') {
      const decodeTags = decodeURIComponent((route.query?.tags as string) || '')
      const routeTags = (decodeTags && decodeTags.split?.(',')) || []
      searchPlaceHolder.value =
        routeTags.length === 0
          ? '在所有标签的文章中进行搜索'
          : `在标签含有 ${routeTags.join(',')} 的文章中搜索`
      if (routeTags.length !== 0) {
        return getAllPostBySearch(
          getAllPostsByTags(allContents, routeTags),
          keyword.value
        )
      }
      return getAllPostBySearch(allContents, keyword.value)
    } else if (route.name === 'BlogCate') {
      const routeCate = decodeURIComponent((route.query?.cate as string) || '')
      searchPlaceHolder.value = !routeCate.trim()
        ? '在所有分类的文章中进行搜索'
        : `在分类为 ${routeCate} 的文章中搜索`
      if (routeCate.trim()) {
        return getAllPostBySearch(
          getAllPostsByCate(allContents, routeCate),
          keyword.value
        )
      }
      return getAllPostBySearch(allContents, keyword.value)
    } else {
      searchPlaceHolder.value = ''
      if (!keyword.value.trim()) {
        // 文章限定初始只显示 3 个
        return store.state.article.directory.slice(0, 3)
      }
      return getAllPostBySearch(allContents, keyword.value)
    }
  }
  const articleItems = ref(getArticleItems())

  function getTagItems() {
    if (route.name === 'BlogTags' || route.name === 'BlogCate') {
      return []
    }
    if (!keyword.value.trim()) {
      return store.state.article.tags.allTags
    }
    return getAllTagsBySearch(store.state.article.directory, keyword.value)
      .allTags
  }
  const tagItems = ref(getTagItems())

  function getArticleItemsIsLoading() {
    return !store.state.article.allContentsLoaded
  }
  const articleItemsIsLoading = ref(getArticleItemsIsLoading())

  function getCateItems() {
    if (route.name === 'BlogTags' || route.name === 'BlogCate') {
      return []
    }
    if (!keyword.value.trim()) {
      return store.state.article.cates.allCates
    }
    return getAllCatesBySearch(store.state.article.directory, keyword.value)
      .allCates
  }
  const cateItems = ref(getCateItems())

  const onSearch = (key: string) => {
    keyword.value = key
    articleItems.value = getArticleItems()
    tagItems.value = getTagItems()
    articleItemsIsLoading.value = getArticleItemsIsLoading()
    cateItems.value = getCateItems()
  }
  const onArticleClick = (data: articleType | articleTypeDirectory) => {
    router.push({ name: 'BlogPost', params: { name: data.name } })
    instance.value?.remove?.()
  }
  const onTagClick = (data: string) => {
    router.push({ name: 'BlogTags', query: { tags: encodeURIComponent(data) } })
    instance.value?.remove?.()
  }
  const onCateClick = (data: string) => {
    router.push({ name: 'BlogCate', query: { cate: encodeURIComponent(data) } })
    instance.value?.remove?.()
  }

  return {
    keyword,
    searchPlaceHolder,
    articleItems,
    articleItemsIsLoading,
    tagItems,
    cateItems,
    onArticleClick,
    onTagClick,
    onCateClick,
    onSearch
  }
}

export function useSearch() {
  const instance = ref<PopoverInstance>()
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  store.dispatch('article/fetchAllContents')

  const createSearch = createPopover(Search, {
    // 自定义点击遮罩层的方法, 入参 done 为关闭弹出层函数
    customOnPopoverMaskClick: (done: Function) => {},
    // 自定义关闭函数
    customCloseFunc: (done: Function) => {
      done()
    }
  })

  const showSearchDialog = () => {
    const searchProps = getSearchProps(store, route, router, instance)
    instance.value = createSearch(searchProps)
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
