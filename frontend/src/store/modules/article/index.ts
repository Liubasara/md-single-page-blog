import type { Module } from 'vuex'
import type { RootStateInterface } from '@/store/index'
import { getArticleDirectory, getAllContents, getDetailArticle } from '@/service'

interface ArticleStateInterface {
  directory: Array<articleTypeDirectory>
  allContents: Array<articleType>
  allContentsLoaded: boolean
}

type ArticleModule = Module<ArticleStateInterface, RootStateInterface>

const module: ArticleModule = {
  namespaced: true,
  state: {
    directory: getArticleDirectory(),
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
    getArticleDetailFunc: (state) => async (articleObj: articleTypeDirectory) => {
      let currentContent!: articleType | undefined
      if (state.allContentsLoaded) {
        // 以 url 和名称作为联合标识符
        currentContent = state.allContents.find((article) => article.name === articleObj.name && article.url === articleObj.url)
      } else {
        currentContent = await getDetailArticle(articleObj.url)
      }
      return currentContent
    }
  }
}

export default module
