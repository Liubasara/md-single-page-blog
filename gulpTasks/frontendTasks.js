const { spawn } = require('child_process')
const path = require('path')
const { series } = require('gulp')

const frontendPath = path.resolve(__dirname, '..', 'frontend')

function frontendInstallTask(cb) {
  process.chdir(frontendPath)
  process.env.FORCE_COLOR = true
  const install = spawn('yarn', ['install', '--frozen-lockfile'], {
    env: process.env,
    shell: true
  })
  install.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString())
  })
  install.on('close', () => {
    cb()
  })
}

function frontendBuildTask(cb) {
  process.chdir(frontendPath)
  process.env.FORCE_COLOR = true
  const build = spawn('yarn', ['build'], {
    env: process.env,
    shell: true
  })
  build.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString())
  })
  build.on('close', () => {
    cb()
  })
}

function frontendDevTask(cb) {
  process.chdir(frontendPath)
  process.env.FORCE_COLOR = true
  const build = spawn('yarn', ['dev'], {
    env: process.env,
    shell: true
  })
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
