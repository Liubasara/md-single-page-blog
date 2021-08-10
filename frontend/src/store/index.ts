import { createStore, StoreOptions } from 'vuex'
import article from '@/store/modules/article/index'

export interface RootStateInterface {
  [key: string]: any;
}

const storeOptions: StoreOptions<RootStateInterface> = {
  modules: {
    article
  }
}

const store = createStore(storeOptions)

export default store
