declare interface Window {
  requestIdleCallback: <T extends Function>(callback: T, options?: object) => {}
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

type articleTypeDirectory = {
  name: string
  title: string
  tags: string[]
  categories: string
  time: string
  url: string
  dirUrl: string
  info?: string
  desc?: string
  keywords?: string[]
  updatedAt?: string
}

type articleType = articleTypeDirectory & { body: string }

type allArticleType = articleType | articleTypeDirectory

declare module 'articleDist/*.json' {
  const value: {
    [key: string]: any
  }
  export default value
}

declare module 'articleDist/directory/directory.json' {
  const value: Array<articleTypeDirectory>
  export default value
}

declare module 'articleDist/allContents/allContents.json' {
  const value: Array<articleType>
  export default value
}

declare module 'click-outside-vue3' {
  const value: {
    directive: Object
  }
  export default value
}

declare type LooseRequired<T> = {
  [P in string & keyof T]: T[P]
}
