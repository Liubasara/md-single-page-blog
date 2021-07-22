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
  }
}

const store = createStore<RootStateInterface>(storeOptions)

export default store
