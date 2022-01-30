import type { PropType } from 'vue'

const props = {
  hasPrev: {
    type: Boolean,
    default: true
  },
  hasNext: {
    type: Boolean,
    default: true
  },
  sortType: {
    type: String as PropType<'time' | 'cate'>,
    default: 'time'
  }
}

export default props