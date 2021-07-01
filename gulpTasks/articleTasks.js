const path = require('path')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const { src, dest, series, parallel } = require('gulp')
const getAllArticlePaths = require('./utils/getAllArticlePaths')
const getAllArticleImgPaths = require('./utils/getAllArticleImgPaths')
const { generateDelTask } = require('./helperTasks')

const TARGET_PATH = path.resolve(__dirname, '..', 'article', 'dist')
const IMG_TARGET_PATH = path.resolve(TARGET_PATH, 'img')
const ARTICLE_PATH = process.env.blogArticlePath || path.resolve(__dirname, '..', 'article', 'demo')
const CLEAN_PATH = path.resolve(TARGET_PATH, '**')

async function generateArticleToJsTask() {
  const allArticlePaths = await getAllArticlePaths(ARTICLE_PATH)
  console.log('getMarkdown', allArticlePaths)
  return src(allArticlePaths).pipe(markdownToJSON(marked)).pipe(dest(TARGET_PATH))
}

async function generateArticleImgTask() {
  const allArticleImgPaths = await getAllArticleImgPaths(ARTICLE_PATH)
  console.log('getMarkdownImage', allArticleImgPaths)
  return src(allArticleImgPaths).pipe(dest(IMG_TARGET_PATH))
}

module.exports = {
  generateArticleToJsTask: series(generateDelTask(CLEAN_PATH), parallel(generateArticleToJsTask, generateArticleImgTask))
}
