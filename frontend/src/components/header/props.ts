const props = {
  name: {
    type: String,
    default: ''
  },
  introduction: {
    type: String,
    default: ''
  }
}

export type HeaderProps = releaseTypeToStateByDefault<typeof props>

export default props
