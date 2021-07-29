const searchProps = {
  name: {
    type: String,
    default: ''
  },
  articleItems: {
    type: Array,
    default: () => <Array<articleTypeDirectory> | Array<articleType>>[]
  }
}

export type SearchProps = releaseTypeToStateByDefault<typeof searchProps>

export default searchProps
