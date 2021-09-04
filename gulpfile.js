require('dotenv-flow').config()
const { parallel, series } = require('gulp')
const { frontendBuildTask, frontendDevTask } = require('./gulpTasks/frontendTasks')
const { buildArticleTask, buildArticleTaskDev } = require('./gulpTasks/articleTasks')
const { generateHostFile } = require('./gulpTasks/hostTasks')

process.env.TZ = 'Asia/Shanghai'

exports.default = series(buildArticleTask, frontendBuildTask, generateHostFile)

exports.dev = series(buildArticleTaskDev, frontendDevTask)

exports.frontend = parallel(frontendBuildTask)

exports.frontendDev = parallel(frontendDevTask)

exports.generateArticleToJs = parallel(buildArticleTask)

exports.generateArticleToJsDev = series(buildArticleTaskDev)
