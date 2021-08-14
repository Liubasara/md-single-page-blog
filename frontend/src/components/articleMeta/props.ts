import type { PropType } from 'vue'

const props = {
  time: {
    type: String,
    default: ''
  },
  tags: {
    type: Array as PropType<Array<string>>,
    default: () => []
  },
  categories: {
    type: String,
    default: ''
  }
}

export default props
