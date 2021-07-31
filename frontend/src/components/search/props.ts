import { ref } from 'vue'
import type { PropType, Ref, ComputedRef } from 'vue'
import type {
  GetAllCatesFnReturn,
  GetAllTagsFnReturn
} from '@/utils/articleUtils'

const searchProps = {
  articleItems: {
    type: Object as PropType<
      ComputedRef<Array<articleTypeDirectory> | Array<articleType>>
    >,
    default: () => <Array<articleTypeDirectory> | Array<articleType>>[]
  },
  articleItemsIsLoading: {
    type: Object as PropType<ComputedRef<boolean>>,
    default: () => ref(true)
  },
  tagItems: {
    type: Object as PropType<ComputedRef<GetAllTagsFnReturn['allTags']>>,
    default: () => <GetAllTagsFnReturn['allTags']>[]
  },
  cateItems: {
    type: Object as PropType<ComputedRef<GetAllCatesFnReturn['allCates']>>,
    default: () => <GetAllCatesFnReturn['allCates']>[]
  },
  keywordRef: {
    type: Object as PropType<Ref<string>>,
    default: () => ref('')
  }
}

export type SearchProps = releaseTypeToStateByDefault<typeof searchProps>

export default searchProps
