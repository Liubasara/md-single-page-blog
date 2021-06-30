const path = require('path')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const { src, dest, series } = require('gulp')
const { generateDelTask } = require('./helperTasks')


const ARTICLE_PATH = process.env.blogArticlePath || path.resolve(__dirname, '..', 'article', 'demo')
const TARGET_PATH = path.resolve(__dirname, '..', 'article', 'dist')
const CLEAN_PATH = path.resolve(TARGET_PATH, '**')

function generateArticleToJsTask() {
  const DEMO_MD_PATH = path.resolve(ARTICLE_PATH, 'tag1', 'demoBlog.md')
  return src(DEMO_MD_PATH).pipe(markdownToJSON(marked)).pipe(dest(TARGET_PATH))
}

module.exports = {
  generateArticleToJsTask: series(generateDelTask(CLEAN_PATH), generateArticleToJsTask)
}
