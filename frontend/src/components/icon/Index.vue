<script lang="tsx">
import { defineComponent, h } from 'vue'
import iconfontDesc from '@/assets/style/iconfont/iconfont.json'

const fontClasses = iconfontDesc.glyphs.map(item => item.font_class)

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: '',
      validator: (value: string) => {
        const isUsableIcon = !!~fontClasses.indexOf(value)
        if (!isUsableIcon) {
          console.error(`Icon: '${value || ''}' is not a usable icon, please verify in iconfont.json`)
        }
        return isUsableIcon
      }
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
</script>
