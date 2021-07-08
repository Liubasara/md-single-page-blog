import type { Module } from 'vuex'
import type { RootStateInterface } from '@/store/index'
import { getArticleDirectory, getAllContents } from '@/service'

interface ArticlestateInterface {
  directory: Array<articleTypeDirectory>;
  allContents: Array<articleType>;
}

type ArticleModule = Module<ArticlestateInterface, RootStateInterface>

const module: ArticleModule = {
  namespaced: true,
  state: {
    directory: getArticleDirectory(),
    allContents: []
  },
  mutations: {
    setAllContents(state, payload) {
      state.allContents = payload
    }
  },
  actions: {
    async fetchAllContents ({ commit }) {
      const res = await getAllContents()
      commit('setAllContents', res)
    }
  }
}

export default module