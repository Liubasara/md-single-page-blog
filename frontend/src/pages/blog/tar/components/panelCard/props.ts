import type { PropType } from 'vue'

interface ListItem {
  time: string;
  title: string;
}

const props = {
  title: {
    type: String
  },
  list: {
    type: Array as PropType<Array<ListItem>>,
    default: () => []
  }
}

export default props