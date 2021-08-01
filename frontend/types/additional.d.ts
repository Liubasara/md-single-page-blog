declare interface Window {
  requestIdleCallback: <T extends Function>(callback: T, options?: object) => {}
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type articleTypeDirectory = {
  name: string
  title: string
  tags: string[]
  categories: string
  info: string
  time: string
  desc: string
  keywords: string[]
  updatedAt: string
  url: string
  dirUrl: string
}

type articleType = articleTypeDirectory & { body: string }

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
