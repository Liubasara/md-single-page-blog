const { spawn } = require('child_process')
const path = require('path')
const { series } = require('gulp')

const frontendPath = path.resolve(__dirname, '..', 'frontend')

function frontendInstallTask(cb) {
  process.chdir(frontendPath)
  const install = spawn('yarn', ['install', '--frozen-lockfile'])
  install.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString())
  })
  install.on('close', () => {
    cb()
  })
}

function frontendBuildTask(cb) {
  process.chdir(frontendPath)
  const build = spawn('yarn', ['build'])
  build.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString())
  })
  build.on('close', () => {
    cb()
  })
}

function frontendDevTask(cb) {
  process.chdir(frontendPath)
  const build = spawn('yarn', ['dev'])
  build.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString())
  })
  build.on('close', () => {
    cb()
  })
}

module.exports = {
  frontendBuildTask: series(frontendInstallTask, frontendBuildTask),
  frontendDevTask: series(frontendInstallTask, frontendDevTask)
}
