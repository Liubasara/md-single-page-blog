import type {
  GetAllCatesFnReturn,
  GetAllTagsFnReturn,
  GetAllTimesByTypeFnReturn
} from '@/logic/article'
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
  tars: {
    type: Object as PropType<GetAllTimesByTypeFnReturn>,
    default: () => ({
      timeSnaps: [],
      tarPosts: [],
      nums: 0
    }),
    validator: (
      obj: GetAllTimesByTypeFnReturn
    ): obj is GetAllTimesByTypeFnReturn => {
      return !!obj.timeSnaps && !!obj.tarPosts
    }
  },
  tarClick: {
    type: Function,
    default: () => {}
  },
  isTarActive: {
    require: true,
    type: Function as PropType<(...args: Array<string>) => boolean>,
    default: () => false
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
  }
}

export default props
