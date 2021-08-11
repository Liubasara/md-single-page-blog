import type { PropType } from 'vue'

const props = {
  name: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  tags: {
    type: Array as PropType<Array<string>>,
    default: () => ([]) as Array<string>
  },
  cate: {
    type: String,
    default: ''
  }
}

export default props
