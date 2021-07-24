declare interface Window {
  requestIdleCallback: <T extends Function>(callback: T, options?: object) => {}
}

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

/**
 * 根据 Props 定义的 defaults 来推断其属性生成输入 props 的对应类型
 */
declare type releaseTypeToStateByDefault<
  T extends { [key: string]: { type: any; default?: any } | any }
> = Partial<
  {
    [P in keyof T]: T[P]['default'];
  }
>
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
