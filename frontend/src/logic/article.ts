import cloneDeep from 'lodash/cloneDeep'
import { getTimeSnapsByType } from '@/utils/date'
import type { Router } from 'vue-router'
import type { splitType } from '@/utils/date'

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

export const getAllTimesByType = (
  allPosts: Array<allArticleType>,
  {
    type = 'month',
    reverse = false,
    minTime,
    maxTime
  }: {
    type?: splitType
    reverse?: boolean
    minTime?: undefined | Date | number | string
    maxTime?: undefined | Date | number | string
  } = {}
) => {
  /**
   * 1. 遍历 allPosts, 找出最小时间(minTime)和最大时间(maxTime), 并将 articles 按照时间从小到大进行排序
   * 2. 创建一个工具函数，输入最小时间和最大时间，输出一个数组 timeSnaps: Array<string>，包含以 月/日/年 作为间隔的从小到大的时间戳
   * 3. 定义一个 map: {}, 两个指针p1 p2, 一个位于 articles[p1] , 一个位于 timeSnaps[p2]
   *    while p1 < articles.length && p2 < timeSnaps.length:
   *      - 当 articles[p1].time < timeSnaps[p2], map[timeSnaps[p2]] = articles[p1], p1++
   *      - 当 articles[p1].time > timeSnaps[p2], p2++
   * 4. 将 map 按照 key 的大小进行排序，转换为数组
   * 5. 返回 map 和 timeSnaps
   */
  const copyAllPosts = cloneDeep(allPosts)
  copyAllPosts.sort((a, b) => +new Date(a.time) - +new Date(b.time)) // 小到大排序
  const _minTime = minTime || copyAllPosts[0].time
  const _maxTime = maxTime || copyAllPosts.slice(-1)[0].time
  const timeSnaps = getTimeSnapsByType(_minTime, _maxTime, type)
  const targetMap: {
    [key in string | number]: Array<allArticleType>
  } = {}
  let p1 = 0
  let p2 = 0
  while (p1 < copyAllPosts.length && p2 < timeSnaps.length - 1) {
    const postTime = +new Date(copyAllPosts[p1].time)
    if (postTime < +timeSnaps[p2]) {
      p1++
    } else if (
      postTime >= +timeSnaps[p2] &&
      postTime < +timeSnaps[p2 + 1]
    ) {
      if (targetMap[+timeSnaps[p2]]) {
        reverse
          ? targetMap[+timeSnaps[p2]].unshift(copyAllPosts[p1])
          : targetMap[+timeSnaps[p2]].push(copyAllPosts[p1])
      } else {
        targetMap[+timeSnaps[p2]] = [copyAllPosts[p1]]
      }
      p1++
    } else if (postTime > +timeSnaps[p2 + 1]) {
      p2++
    }
  }
  const sortedPostTimeSnap = Object.keys(targetMap).sort((a, b) =>
    reverse ? +b - +a : +a - +b
  )
  // 完成归档的所有时间戳
  const tarPosts = sortedPostTimeSnap.map((timeSnap) => ({
    time: timeSnap,
    objs: targetMap[timeSnap]
  }))
  return {
    timeSnaps: sortedPostTimeSnap,
    tarPosts: tarPosts,
    nums: p1
  }
}
