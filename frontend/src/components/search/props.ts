import type { PropType } from 'vue'
import type {
  GetAllCatesFnReturn,
  GetAllTagsFnReturn
} from '@/logic/article'

const searchProps = {
  articleItems: {
    type: Array as PropType<Array<articleTypeDirectory> | Array<articleType>>,
    default: () => <Array<articleTypeDirectory> | Array<articleType>>[]
  },
  articleItemsIsLoading: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  tagItems: {
    type: Array as PropType<GetAllTagsFnReturn['allTags']>,
    default: () => <GetAllTagsFnReturn['allTags']>[]
  },
  cateItems: {
    type: Array as PropType<GetAllCatesFnReturn['allCates']>,
    default: () => <GetAllCatesFnReturn['allCates']>[]
  },
  keyword: {
    type: String as PropType<string>,
    default: ''
  },
  searchPlaceHolder: {
    type: String as PropType<string>,
    default: ''
  }
}

export type SearchEventHandler = {
  onTagClick: Function
  onArticleClick: Function
  onCateClick: Function,
  onSearch: Function
}

export default searchProps
