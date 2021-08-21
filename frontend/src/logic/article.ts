import type { Router } from 'vue-router'

export const navigateToArticle = (name: string, router: Router) => {
  router.push({ name: 'BlogPost', params: { name: name } })
}

type allArticleType = articleType | articleTypeDirectory

type tagsMapType = {
  [key: string]: {
    num: number
    articles: Array<allArticleType>
  }
}

/**
 * @description 返回所有的Tag
 */
export const getAllTags = (allPosts: Array<allArticleType>) => {
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

export type GetAllTagsFnReturn = ReturnType<typeof getAllTags>

/**
 * @description 按给出的字符搜索 Tags
 * @param allPosts
 * @param str
 */
export const getAllTagsBySearch = (
  allPosts: Array<allArticleType>,
  str: string
) => {
  const allTagsObj = getAllTags(allPosts)
  const { allTags, tagsMap } = allTagsObj
  const targetObj: GetAllTagsFnReturn = {
    allTags: [],
    tagsMap: {}
  }
  for (let tag of allTags) {
    if (~tag.indexOf(str)) {
      targetObj.tagsMap[tag] = tagsMap[tag]
      targetObj.allTags.push(tag)
    }
  }
  return targetObj
}

/**
 * @description 按 Tag 查询文章
 * @param {Array} tags
 */
export const getAllPostsByTags = <T extends allArticleType>(
  allPosts: Array<T>,
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
    num: number
    articles: Array<allArticleType>
  }
}

/**
 * @description 返回所有的Categories
 */
export const getAllCates = <T extends allArticleType>(allPosts: Array<T>) => {
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

export type GetAllCatesFnReturn = ReturnType<typeof getAllCates>

/**
 * @description 按给出的字符搜索 Cate
 * @param allPosts
 * @param str
 * @returns
 */
export const getAllCatesBySearch = (
  allPosts: Array<allArticleType>,
  str: string
) => {
  const allCatesObj = getAllCates(allPosts)
  const { allCates, catesMap } = allCatesObj
  const targetObj: ReturnType<typeof getAllCates> = {
    allCates: [],
    catesMap: {}
  }
  for (let cate of allCates) {
    if (~cate.indexOf(str)) {
      targetObj.allCates.push(cate)
      targetObj.catesMap[cate] = catesMap[cate]
    }
  }
  return targetObj
}

/**
 * @description 按分类查询文章
 * @param {Array} tags
 */
export const getAllPostsByCate = <T extends allArticleType>(
  allPosts: Array<T>,
  cate: string
) => {
  const categoriesResult = allPosts.filter((item) => {
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
  const allCatesArticle: Array<allArticleType> =
    catesMaps?.[cate]?.articles || []
  return allCatesArticle
}

/**
 * 在 str 中查找 Item 并以 width 为前后宽度进行切割
 * eg. str: '哈哈你好哈哈哈哈你好啊好啊好哈' item: '你好' { width: 1 }
 *     return: 哈你好哈...... || ......哈你好啊
 * @param str
 * @param item
 * @param param2
 * @returns
 */
export const sliceItemInStrByWidth = (
  str: string,
  item: string,
  { width = 10 } = { width: 10 }
) => {
  let strArray = []
  let index = str.indexOf(item)
  while (index > -1) {
    strArray.push(
      str.slice(
        index - width < 0 ? 0 : index - width,
        index + width + item.length
      )
    )
    index = str.indexOf(item, index + 1)
  }
  return strArray.join('...... || ......')
}

/**
 * @description 按给出的字符搜索文章(包括内容、简介、标题)
 * @param {String} str
 */
export const getAllPostBySearch = (
  allPosts: Array<articleType>,
  str: string
) => {
  const contentResult = allPosts.filter((item) => {
    const contents = decodeURIComponent(window.atob(item.body))
    return (
      ~contents.indexOf(str) || // 内容
      ~item.info.indexOf(str) || // 简介
      ~item.title.indexOf(str)
    ) // 标题
    // ~item.tags.findIndex(tag => ~tag.indexOf(str)) || // 标签
    // ~item.categories.indexOf(str) // 分类
  })
  return contentResult
}
