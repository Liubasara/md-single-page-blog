const { parallel } = require('gulp')
const { frontendBuildTask, frontendDevTask } = require('./gulpTasks/frontendTasks')
const { generateArticleToJsTask } = require('./gulpTasks/articleTasks')

exports.default = parallel(frontendBuildTask)

exports.frontendDev = parallel(frontendDevTask)

exports.generateArticleToJs = parallel(generateArticleToJsTask)
