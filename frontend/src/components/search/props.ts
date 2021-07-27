const searchProps = {
  name: {
    type: String,
    default: ''
  }
}

export type SearchProps = releaseTypeToStateByDefault<typeof searchProps>

export default searchProps
