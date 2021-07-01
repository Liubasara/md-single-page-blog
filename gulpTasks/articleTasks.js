const path = require('path')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const { src, dest, series, parallel } = require('gulp')
const getAllArticlePaths = require('./utils/getAllArticlePaths')
const getAllArticleImgPaths = require('./utils/getAllArticleImgPaths')
const { generateDelTask } = require('./helperTasks')

const TARGET_PATH = path.resolve(__dirname, '..', 'article', 'dist')
const ARTICLE_PATH = process.env.blogArticlePath || path.resolve(__dirname, '..', 'article', 'demo')

const ALL_ARTICLE_PKG_TARGET_PATH = path.resolve(TARGET_PATH, 'allArticle') // 所有单独文章内容
const ALL_ARTICLE_CONTENTS_TARGET_PATH = path.resolve(TARGET_PATH, 'allContents', 'allContents.json') // 单数组包含所有文章内容
const ALL_ARTICLE_DIRECTORY_TARGET_PATH = path.resolve(TARGET_PATH, 'directory', 'directory.json') // 单数组所有文章不包含内容的目录

const CLEAN_PATH = path.resolve(TARGET_PATH, '**')

async function generateArticleToJsTask() {
  const allArticlePaths = await getAllArticlePaths(ARTICLE_PATH)
  console.log('getMarkdown', allArticlePaths)
  return src(allArticlePaths, { base: ARTICLE_PATH }).pipe(markdownToJSON(marked)).pipe(dest(ALL_ARTICLE_PKG_TARGET_PATH))
}

async function generateArticleImgTask() {
  const allArticleImgPaths = await getAllArticleImgPaths(ARTICLE_PATH)
  console.log('getMarkdownImage', allArticleImgPaths)
  return src(allArticleImgPaths, { base: ARTICLE_PATH }).pipe(dest(ALL_ARTICLE_PKG_TARGET_PATH))
}

module.exports = {
  generateArticleToJsTask: series(
    generateDelTask(CLEAN_PATH),
    parallel(generateArticleToJsTask, generateArticleImgTask)
  )
}
