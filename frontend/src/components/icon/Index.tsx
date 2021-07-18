import { defineComponent, PropType, h } from 'vue'

type IconFontType =
  | 'folder'
  | 'github'
  | 'tag'
  | 'search'
  | 'baseline-menu-px'
  | 'resume'
  | 'cup-fill'
  | 'friends'
  | 'Category'
  | 'home'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<IconFontType>,
      default: ''
    },
    as: {
      type: String,
      default: 'i'
    },
    size: {
      type: Number,
      default: 14
    },
    color: {
      type: String
    }
  },
  setup(props) {
    return () => {
      // const elm = <props.as class={`iconfont icon-${props.type}`}></props.as>
      return h(props.as, {
        class: [
          `iconfont icon-${props.type}`
        ],
        style: {
          fontSize: `${props.size}px`,
          color: `${props.color}`
        }
      })
    }
  }
})
