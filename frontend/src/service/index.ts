import directory from 'articleDist/directory/directory.json'
import idle from '@/utils/idle'

const modules = import.meta.glob('/../article/dist/allArticle/**/*.*')
const moduleKeys = Object.keys(modules)

export const getArticleDirectory = () => directory

export const getAllContents = async () => {
  let allContents: Array<articleType> = []
  try {
    const { default: res } = await import(
      'articleDist/allContents/allContents.json'
    )
    allContents = res
  } catch (e) {
    console.error(e)
  }
  return allContents
  // 模拟网络慢的情况
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(allContents)
  //   }, 10000)
  // })
}

function stringToRegExpHelper(args: TemplateStringsArray, rawStr: string) {
  const specialStr = [`[`, '\\', '^', '$', '.', '|', '?', '*', '+', '(', ')']
  const strArr = rawStr.split('')
  for (let i = 0; i < strArr.length; i++) {
    const str = strArr[i]
    if (~specialStr.indexOf(str)) {
      strArr[i] = '\\' + str
    }
  }
  return strArr.join('')
}

export const getResourceDetail = async (url: string) => {
  const resourceModuleKey = moduleKeys.find((key) =>
    new RegExp(stringToRegExpHelper`${url}`).test(key)
  )
  if (!resourceModuleKey) return
  let resource!: unknown
  try {
    const res = await modules[resourceModuleKey]()
    resource = res.default
  } catch (e) {
    console.error(e)
  }
  return resource
}

idle(getAllContents)
