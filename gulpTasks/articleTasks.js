const path = require('path')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const { src, dest, series } = require('gulp')
const getAllArticlePaths = require('./utils/getAllArticlePaths')
const { generateDelTask } = require('./helperTasks')

const TARGET_PATH = path.resolve(__dirname, '..', 'article', 'dist')
const ARTICLE_PATH = process.env.blogArticlePath || path.resolve(__dirname, '..', 'article', 'demo')
const CLEAN_PATH = path.resolve(TARGET_PATH, '**')

async function generateArticleToJsTask() {
  const allArticlePaths = await getAllArticlePaths(ARTICLE_PATH)
  console.log('getMarkdown', allArticlePaths)
  return src(allArticlePaths).pipe(markdownToJSON(marked)).pipe(dest(TARGET_PATH))
}

module.exports = {
  generateArticleToJsTask: series(generateDelTask(CLEAN_PATH), generateArticleToJsTask)
}
