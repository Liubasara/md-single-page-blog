const path = require('path')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const { src, dest, series, parallel } = require('gulp')
const getAllArticlePaths = require('./utils/getAllArticlePaths')
const getAllArticleImgPaths = require('./utils/getAllArticleImgPaths')
const mkDirAndCreateFile = require('./utils/mkDirAndCreateFile')
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
  const markdownTask = src(allArticlePaths, { base: ARTICLE_PATH }).pipe(markdownToJSON(marked))
  const allContents = []
  const directory = []
  markdownTask.on('data', function (file) {
    const contents = JSON.parse(file.contents.toString())
    contents.url = path.relative(ALL_ARTICLE_PKG_TARGET_PATH, file.path)
    allContents.push(contents)
    directory.push({ ...contents, body: undefined })
  })
  markdownTask.on('end', () => {
    mkDirAndCreateFile(ALL_ARTICLE_CONTENTS_TARGET_PATH, JSON.stringify(allContents))
    mkDirAndCreateFile(ALL_ARTICLE_DIRECTORY_TARGET_PATH, JSON.stringify(directory))
  })
  return markdownTask.pipe(dest(ALL_ARTICLE_PKG_TARGET_PATH))
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
