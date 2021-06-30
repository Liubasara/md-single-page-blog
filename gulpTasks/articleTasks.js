const path = require('path')

const ARTICLE_PATH = process.env.blogArticlePath || path.resolve(__dirname, '..', 'article', 'demo')

function generateArticleToJsTask(cb) {
  console.log(ARTICLE_PATH)
  cb()
}

module.exports = {
  generateArticleToJsTask
}
