import directory from 'articleDist/directory/directory.json'
import idle from '@/utils/idle'

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

idle(getAllContents)
