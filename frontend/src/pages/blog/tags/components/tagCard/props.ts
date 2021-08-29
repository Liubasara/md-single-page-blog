import type { PropType } from 'vue'

const props = {
  title: {
    type: String
  },
  time: {
    type: String
  },
  tags: {
    type: Array as PropType<Array<string>>,
    default: () => []
  }
}

export default props
