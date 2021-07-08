import { createStore } from 'vuex'
import article from '@/store/modules/article/index'

export interface RootStateInterface {
  article: typeof article;
  [key: string]: any;
}

const store = createStore<RootStateInterface>({
  modules: {
    article
  }
})

export default store
