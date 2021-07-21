type allArticleType = articleType | articleTypeDirectory

type tagsMapType = {
  [key: string]: {
    num: number,
    articles: Array<allArticleType>
  }
}

/**
 * @description 返回所有的Tag
 */
export const getAllTags = (
  allPosts: Array<allArticleType>
) => {
  const tagsMap: tagsMapType = {}
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

/**
 * @description 按 Tag 查询文章
 * @param {Array} tags
 */
export const getAllPostsByTags = (
  allPosts: Array<allArticleType>,
  tags: Array<string>
) => {
  const tagResult = allPosts.filter((post) => {
    return tags.some((tag) => post.tags.includes(tag))
  })
  return tagResult
}

/**
 * @description 按 Tag 查询文章 Better Performance
 * @param {Array} tags
 */
export const getPostsByTagsMaps = <T extends tagsMapType, K extends keyof T>(
  tagsMaps: T,
  tags: Array<K>
) => {
  const allSelectedTagsArticle: Array<allArticleType> = []
  for (let tag of tags) {
    const { articles } = tagsMaps[tag]
    allSelectedTagsArticle.push(...articles)
  }
  return Array.from(new Set(allSelectedTagsArticle))
}
