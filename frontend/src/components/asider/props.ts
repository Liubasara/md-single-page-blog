import type { GetAllCatesFnReturn, GetAllTagsFnReturn } from '@/utils/articleUtils'
import type { PropType } from 'vue'

const props = {
  tags: {
    type: Object as PropType<GetAllTagsFnReturn>,
    default: () => ({
      allTags: [],
      tagsMap: {}
    }),
    validator: (obj: GetAllTagsFnReturn): obj is GetAllTagsFnReturn => {
      return !!obj.allTags && !!obj.tagsMap
    }
  },
  cates: {
    type: Object as PropType<GetAllCatesFnReturn>,
    default: () => ({
      allCates: [],
      catesMap: {}
    }),
    validator: (obj: GetAllCatesFnReturn): obj is GetAllCatesFnReturn => {
      return !!obj.allCates && !!obj.catesMap
    }
  },
  tagClick: {
    type: Function,
    default: () => {}
  },
  cateClick: {
    type: Function,
    default: () => {}
  },
  isTagActive: {
    require: true,
    type: Function as PropType<(...args: Array<string>) => boolean>,
    default: () => false
  },
  isCateActive: {
    require: true,
    type: Function as PropType<(...args: Array<string>) => boolean>,
    default: () => false
  },
}

export default props
