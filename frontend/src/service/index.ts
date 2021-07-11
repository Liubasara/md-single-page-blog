import directory from 'articleDist/directory/directory.json'
import idle from '@/utils/idle'

const modules = import.meta.glob('/../article/dist/allArticle/**/*.*')
const moduleKeys = Object.keys(modules)

export const getArticleDirectory = () => directory

export const getAllContents = async () => {
  let allContents: Array<articleType> = []
  try {
    const { default: res } = await import('articleDist/allContents/allContents.json')
    allContents = res
  } catch (e) {
    console.error(e)
  }
  return allContents
}

export const getDetailArticle = async (url: string) => {
  const articleModuleKey = moduleKeys.find((key) => new RegExp(url).test(key))
  if (!articleModuleKey) return
  let article!: articleType
  try {
    const res = await modules[articleModuleKey]() as { default: articleType }
    article = res.default
  } catch (e) {
    console.error(e)
  }
  return article
}

idle(getAllContents)
