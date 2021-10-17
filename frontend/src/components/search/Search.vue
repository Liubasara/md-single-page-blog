<template>
  <div class="search-wrapper">
    <div class="search-input-wrapper" ref="searchInputRef">
      <div class="search-input-container">
        <input
          ref="searchInput"
          type="text"
          :placeholder="searchPlaceHolder || '想要查找什么...'"
          v-model="inputKeyword"
          @input="onSearchInput"
        />
        <button type="button" class="close-btn" @click="close">x</button>
      </div>
    </div>
    <div
      v-if="ifShowSearchRes"
      class="ins-section-container"
      v-InfiniteScroll="pageInstance.loadNextPage"
      infinite-scroll-immediate="true"
      ref="searchRes"
    >
      <section v-if="articleItems.length > 0" class="ins-section" ref="articleSearchRes">
        <header class="ins-section-header">文章</header>
        <div
          class="ins-search-item"
          v-for="(item, index) in pageInstance.pageArticleItems"
          :key="index"
          @click="onArticleClick(item)"
        >
          <header>
            <Icon type="file" class="mg-r-8"></Icon>
            {{ item.title }}
          </header>
          <p class="ins-search-preview" v-if="item.info && !!item.info.trim()">{{ item.info }}</p>
          <p
            class="ins-search-preview search-res"
            v-for="(searchInfo, searchInfoIndex) in getSearchInfo(index)"
            :key="`searchInfo-${searchInfoIndex}`"
          >
            <template v-if="isObject(searchInfo)">
              <span>{{ searchInfo.pre }}</span>
              <span class="search-hightlight">{{ searchInfo.hightlight }}</span>
              <span>{{ searchInfo.after }}</span>
            </template>
          </p>
        </div>
      </section>
      <section class="ins-section" v-if="articleItems.length === 0 && articleItemsIsLoading">
        <header class="ins-section-header">文章</header>
        <div class="ins-search-item">
          <p class="ins-search-preview">文章搜索中, 请稍候...</p>
        </div>
      </section>
      <section class="ins-section" v-if="tagItems.length > 0">
        <header class="ins-section-header">标签</header>
        <div
          class="ins-search-item"
          v-for="(item, index) in tagItems"
          :key="index"
          @click="onTagClick(item)"
        >
          <header>
            <Icon type="tag" class="mg-r-8"></Icon>
            {{ item }}
          </header>
        </div>
      </section>
      <section class="ins-section" v-if="cateItems.length > 0">
        <header class="ins-section-header">分类</header>
        <div
          class="ins-search-item"
          v-for="(item, index) in cateItems"
          :key="index"
          @click="onCateClick(item)"
        >
          <header>
            <Icon type="Category" class="mg-r-8"></Icon>
            {{ item }}
          </header>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs, onMounted, reactive, watch, nextTick, onBeforeUnmount } from 'vue'
import searchProps from '@/components/search/props'
import Icon from '@/components/icon/Index.vue'
import InfiniteScroll from '@/components/scroll/directives/infinite-scroll'
import { getContentSearch, isArticleType, getArticleText } from '@/logic/article'
import debounce from 'lodash/debounce'
import isObject from 'lodash/isObject'
import type { Ref } from 'vue'

const PAGE_SIZE = 5

function usePage(
  articleItems: Ref<Array<allArticleType>>,
  inputKeyword: Ref<string>,
  searchRes: Ref<HTMLDivElement | undefined>,
  articleSearchRes: Ref<HTMLDivElement | undefined>
) {
  const page = ref(1)
  const pageArticleItems = computed(() => {
    return articleItems.value.slice(0, PAGE_SIZE * page.value)
  })
  const nomore = computed(() => {
    return !(page.value * PAGE_SIZE < articleItems.value.length)
  })
  const resetPage = () => {
    page.value = 1
  }
  const loadNextPage = () => {
    if (!nomore.value) {
      page.value += 1
    }
  }
  watch(inputKeyword, () => {
    resetPage()
  })
  function handleScroll() {
    nextTick(() => {
      (searchRes as unknown as Ref<HTMLDivElement & { ElInfiniteScroll: any; } | undefined>).value?.ElInfiniteScroll?.onScroll?.()
      const articleSearchResHeight = articleSearchRes.value?.offsetHeight || 0
      const searchResHeight = searchRes.value?.offsetHeight || 0
      if (articleSearchResHeight < searchResHeight && !nomore.value) {
        loadNextPage()
        return handleScroll()
      }
    })
  }
  watch(articleItems, () => {
    handleScroll()
  })
  let observer: ResizeObserver | undefined;
  onMounted(() => {
    observer = new ResizeObserver(handleScroll)
    searchRes.value && observer.observe(searchRes.value)
  })
  onBeforeUnmount(() => {
    observer?.disconnect()
  })
  return {
    page,
    pageArticleItems,
    resetPage,
    loadNextPage,
    nomore
  }
}

export default defineComponent({
  name: 'Search',
  props: searchProps,
  components: {
    Icon
  },
  directives: {
    InfiniteScroll
  },
  emits: ['close', 'article-click', 'tag-click', 'cate-click', 'search', 'update:articleItemsIsLoading'],
  setup(props, { emit }) {
    const { keyword, articleItems, cateItems, tagItems, articleItemsIsLoading, searchPlaceHolder } = toRefs(props)
    const searchInput = ref<HTMLInputElement>()
    const searchRes = ref<HTMLDivElement>()
    const articleSearchRes = ref<HTMLDivElement>()
    onMounted(() => {
      searchInput.value?.focus()
    })
    const inputKeyword = ref(keyword.value)
    watch(inputKeyword, () => {
      searchRes.value?.scrollTop && (searchRes.value.scrollTop = 0)
    })
    const pageInstance = reactive(usePage(articleItems, inputKeyword, searchRes, articleSearchRes))
    const emitSearch = debounce(function () {
      emit('search', inputKeyword.value)
    }, 200)
    const onSearchInput = function ($evt: Event) {
      if ($evt instanceof InputEvent) {
        emitSearch()
      }
    }
    const close = () => {
      emit('close')
    }
    const searchInputRef = ref<HTMLElement>()
    const searchInputRefHeight = computed(() => {
      return searchInputRef.value?.offsetHeight || 0
    })
    const ifShowSearchRes = computed(() => {
      return (
        articleItems.value.length > 0 ||
        tagItems.value.length > 0 ||
        cateItems.value.length > 0 ||
        articleItemsIsLoading.value
      )
    })
    const searchInfos = computed(() => {
      const res = articleItems.value.map((article: articleTypeDirectory | articleType) => {
        if (isArticleType(article)) {
          return getContentSearch(getArticleText(article.body), inputKeyword.value)
        }
        return []
      })
      return res
    })
    const getSearchInfo = (index: number) => searchInfos.value[index]
    const onArticleClick = (item: articleTypeDirectory | articleType) => {
      emit('article-click', item)
    }
    const onTagClick = (item: string) => {
      emit('tag-click', item)
    }
    const onCateClick = (item: string) => {
      emit('cate-click', item)
    }


    return {
      inputKeyword,
      onSearchInput,
      close,
      searchInputRef,
      searchInputRefHeight,
      articleItems,
      cateItems,
      tagItems,
      ifShowSearchRes,
      articleItemsIsLoading,
      searchPlaceHolder,
      onArticleClick,
      onTagClick,
      onCateClick,
      getSearchInfo,
      searchInput,
      searchInfos,
      isObject,
      pageInstance,
      searchRes,
      articleSearchRes
    }
  }
})
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 559px), screen and (max-height: 479px) {
    background: #fff;
  }
}
.search-input-wrapper {
  position: relative;
}
.search-input-container {
  display: flex;
  input {
    display: block;
    width: 100%;
    border: none;
    outline: 0;
    font-size: 16px;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 200;
    border-radius: 0;
    background: #fff;
    line-height: 20px;
    padding: 12px 28px 12px 20px;
    border-bottom: 1px solid #e2e2e2;
    font-family: "Microsoft Yahei Light", "Microsoft Yahei", Helvetica, Arial,
      sans-serif;
  }
  .close-btn {
    text-transform: none;
    font-family: inherit;
    outline: 0;
    text-shadow: 0 1px 0 #fff;
    line-height: 1;
    float: right;
    top: 50%;
    right: 6px;
    width: 20px;
    height: 20px;
    font-size: 24px;
    margin-top: -15px;
    position: absolute;
    text-align: center;
    opacity: 1;
    color: #666;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    user-select: none;
    &:hover {
      color: #006bde;
    }
  }
}
.ins-section-container {
  font-size: 14px;
  line-height: 16px;
  overflow: auto;
  height: calc(100% - v-bind(searchInputRefHeight) * 1px);
  background: #fff;
}
.ins-section-header {
  color: #9a9a9a;
  border-bottom: 1px solid #e2e2e2;
  padding: 8px 15px;
  display: block;
}
.ins-search-item {
  cursor: pointer;
  padding: 8px 15px;
  header {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ins-search-preview {
    height: 15px;
    font-size: 12px;
    color: #9a9a9a;
    margin: 5px 0 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .search-res {
    border-left: #9a9a9a solid 3px;
    padding-left: 10px;
    margin-bottom: 2px;
    .search-hightlight {
      background: #f9ff23;
    }
  }
  &:hover {
    color: #fff;
    background: #006bde;
    .ins-search-preview {
      color: #fff;
    }
    .search-res {
      .search-hightlight {
        background: #ccb81ef0;
      }
    }
  }
}
.mg-r-8 {
  margin-right: 8px;
}
</style>

