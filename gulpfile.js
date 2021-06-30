const { parallel } = require('gulp')
const { frontendBuildTask, frontendDevTask } = require('./gulpTasks/frontendTasks.js')

exports.default = parallel(frontendBuildTask)

exports.frontendDev = parallel(frontendDevTask)
