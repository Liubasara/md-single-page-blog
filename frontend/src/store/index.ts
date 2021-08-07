import { createStore, StoreOptions } from 'vuex'
import article from '@/store/modules/article/index'

export interface RootStateInterface {
  searchData: string
}

const storeOptions: StoreOptions<RootStateInterface> = {
  modules: {
    article
  },
  state: {
    searchData: ''
  },
  mutations: {
    setSearchData(state, name) {
      state.searchData = name || ''
    }
  }
}

const store = createStore(storeOptions)

export default store
