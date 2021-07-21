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

type catesMapType = {
  [key: string]: {
    num: number,
    articles: Array<allArticleType>
  }
}

/**
 * @description 返回所有的Categories
 */
 export const getAllCates = (allPosts: Array<allArticleType>) => {
  const catesMap: catesMapType = {}
  for (let post of allPosts) {
    const { categories: cate } = post
    if (catesMap[cate]) {
      catesMap[cate].num = catesMap[cate].articles.push(post)
      continue
    }
    catesMap[cate] = {
      articles: [post],
      num: 1
    }
  }
  return {
    allCates: Object.keys(catesMap),
    catesMap
  }
}

/**
 * @description 按分类查询文章
 * @param {Array} tags
 */
 export const getAllPostsByCate = (
  allPosts: Array<allArticleType>,
  cate: string
) => {
  const categoriesResult = allPosts.filter(item => {
    return item.categories === cate
  })
  return categoriesResult
}

/**
 * @description 按 Tag 查询文章 Better Performance
 * @param {Array} tags
 */
 export const getPostsByCatesMaps = <T extends catesMapType, K extends keyof T>(
  catesMaps: T,
  cate: K
) => {
  const allCatesArticle: Array<allArticleType> = catesMaps?.[cate]?.articles || []
  return allCatesArticle
}


