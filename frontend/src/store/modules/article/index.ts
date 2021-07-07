import type { Module } from 'vuex'
import type { RootStateInterface } from '@/store/index'
import directory from 'articleDist/directory/directory.json'

interface ArticlestateInterface {
  directory: Array<articleTypeDirectory>;
}

const module: Module<ArticlestateInterface, RootStateInterface> = {
  state: {
    directory
  }
}

export default module