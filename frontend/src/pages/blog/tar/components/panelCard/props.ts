import type { PropType } from 'vue'

export interface ListItem {
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