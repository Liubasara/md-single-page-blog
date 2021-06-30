const path = require('path')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const gulp = require('gulp')

const ARTICLE_PATH = process.env.blogArticlePath || path.resolve(__dirname, '..', 'article', 'demo')
const TARGET_PATH = path.resolve(__dirname, '..', 'article', 'dist')

function generateArticleToJsTask() {
  const DEMO_MD_PATH = path.resolve(ARTICLE_PATH, 'tag1', 'demoBlog.md')
  return gulp.src(DEMO_MD_PATH).pipe(markdownToJSON(marked)).pipe(gulp.dest(TARGET_PATH))
}

module.exports = {
  generateArticleToJsTask
}
