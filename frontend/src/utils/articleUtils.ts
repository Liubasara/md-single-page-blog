/**
 * @description 返回所有的Tag
 */
export const getAllTags = (allPosts: Array<articleType | articleTypeDirectory>) => {
  const tagsMap: {
    [key: string]: {
      num: number
      articles: Array<articleType | articleTypeDirectory>
    }
  } = {}
  for (let post of allPosts) {
    for (let tag of post.tags) {
      if (tagsMap[tag]) {
        tagsMap[tag].num = tagsMap[tag].articles.push(post)
        continue
      }
      tagsMap[tag] = {
        articles: [post],
        num: 1
      }
    }
  }
  return {
    allTags: Object.keys(tagsMap),
    tagsMap
  }
}
