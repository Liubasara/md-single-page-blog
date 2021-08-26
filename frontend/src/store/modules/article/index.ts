import type { Module, Getter } from 'vuex'
import type { RootStateInterface } from '@/store/index'
import {
  getArticleDirectory,
  getAllContents,
  getResourceDetail
} from '@/service'
import URIJS from 'urijs'
import { getAllPostBySearch, getAllCates, getAllTags, getAllTimesByType } from '@/logic/article'

const directory = getArticleDirectory()
const tags = getAllTags(directory)
const cates = getAllCates(directory)
const tars = getAllTimesByType(directory)
export interface ArticleStateInterface {
  directory: Array<articleTypeDirectory>
  allContents: Array<articleType>
  allContentsLoaded: boolean
  tags: typeof tags
  cates: typeof cates,
  tars: typeof tars
}

export type StoreArticleModuleState = {
  article: ArticleStateInterface
  [key: string]: any
}

type ArticleModule = Module<ArticleStateInterface, RootStateInterface>

type ArticleModuleGetter = Getter<ArticleStateInterface, RootStateInterface>

async function parseArticleBody(article: articleType): Promise<string> {
  let decodedBody = decodeURIComponent(window.atob(article.body))
  decodedBody = await handleImgs(decodedBody, article)
  return decodedBody
}

const getArticleDetailFunc = (
  state: ArticleStateInterface,
  getters: any,
  rootState: RootStateInterface,
  rootGetters: any
) => async (articleObj: articleTypeDirectory) => {
  let currentContent!: articleType | undefined
  if (state.allContentsLoaded) {
    // 以 url 和名称作为联合标识符
    currentContent = state.allContents.find(
      (article) =>
        article.name === articleObj.name && article.url === articleObj.url
    )
  } else {
    currentContent = (await getResourceDetail(articleObj.url)) as articleType
  }
  currentContent &&
    (currentContent = {
      ...currentContent,
      body: await parseArticleBody(currentContent)
    })
  return currentContent
}

export type articleGettersFuncType = ReturnType<typeof getArticleDetailFunc>

const allArticleContentsWithSearch: ArticleModuleGetter = (
  state,
  getters,
  rootState
) => {
  const allContents = state.allContents
  if (rootState.searchData) {
    return getAllPostBySearch(allContents, rootState.searchData)
  }
  return allContents
}

export type getArticleDetailGettersType = ReturnType<
  typeof getArticleDetailFunc
>

async function handleImgs(decodedBody: string, article: articleType) {
  const tmpParentElm = document.createElement('div')
  tmpParentElm.innerHTML = decodedBody

  const imgs = Array.from(tmpParentElm?.querySelectorAll?.('img') || [])
  const loadAllImgPromises = imgs.map(async (elm) => {
    async function dealwithElmUrl() {
      // 组合 elm 的 URL
      const srcAttribute = elm.getAttribute('src')
      if (
        article.dirUrl &&
        srcAttribute &&
        !/^(http|https):\/\//.test(srcAttribute) // 非相对路径的图片才需要进行处理
      ) {
        const relativeUrl = decodeURIComponent(
          URIJS(article.dirUrl + '/' + srcAttribute)
            .absoluteTo('/')
            .toString()
        )
        const imgResource = (await getResourceDetail(relativeUrl)) as string
        elm.setAttribute('src', imgResource)
        return imgResource
      }
    }
    function dealWithElmPosition() {
      const parentElm = elm.parentElement
      parentElm && (parentElm.style.textAlign = 'center')
    }
    dealWithElmPosition()
    return dealwithElmUrl()
  })
  await Promise.all(loadAllImgPromises)
  return tmpParentElm.innerHTML
}

const module: ArticleModule = {
  namespaced: true,
  state: {
    directory,
    tags,
    cates,
    tars,
    allContents: [],
    allContentsLoaded: false
  },
  mutations: {
    setAllContents(state: ArticleStateInterface, payload: Array<articleType>) {
      state.allContents = payload
    },
    setAllContentsLoaded(state: ArticleStateInterface, payload: boolean) {
      state.allContentsLoaded = payload
    }
  },
  actions: {
    async fetchAllContents({ commit }) {
      const res = await getAllContents()
      commit('setAllContentsLoaded', true)
      commit('setAllContents', res)
    }
  },
  getters: {
    getArticleDetailFunc,
    allArticleContentsWithSearch
  }
}

export default module
