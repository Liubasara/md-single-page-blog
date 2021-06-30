const { spawn } = require('child_process')
const path = require('path')

const frontendPath = path.resolve(__dirname, '..', 'frontend')

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
  frontendBuildTask,
  frontendDevTask
}
