const gulp = require('gulp')
const { parallel } = gulp
const { spawn } = require('child_process')

function frontendBuildTask(cb) {
  process.chdir('frontend')
  const build = spawn('yarn', ['build'])
  build.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString())
  })
  build.on('close', () => {
    cb()
  })
}

function frontendDevTask(cb) {
  process.chdir('frontend')
  const build = spawn('yarn', ['dev'])
  build.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString())
  })
  build.on('close', () => {
    cb()
  })
}

exports.default = parallel(frontendBuildTask)

exports.frontendDev = parallel(frontendDevTask)
