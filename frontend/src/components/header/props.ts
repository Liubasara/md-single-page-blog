import type { PropType } from 'vue'

type HeaderRoutesType = {
  name: string
  iconType: string
  routerParams: {
    path: string
  }
}

const props = {
  name: {
    type: String,
    default: ''
  },
  introduction: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  headerRoutes: {
    type: Array as PropType<Array<HeaderRoutesType>>,
    default: () => []
  }
}

export default props
