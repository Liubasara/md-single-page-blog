/**
 * 根据 host 生成静态资源
 */
const path = require('path')
const { promisify } = require('util')
const { readFile } = require('fs')
const syncReadFile = promisify(readFile)
const template = require('lodash/template')
const mkDirAndCreateFile = require('./utils/mkDirAndCreateFile')
const HOST_NAME = process.env.blogHost || ''
const CNAME_FILE_PATH = path.resolve(__dirname, 'public', 'template', 'CNAME')
const TARGET_CNAME_FILE_PATH = path.resolve(
  __dirname,
  '..',
  'frontend',
  'dist',
  'CNAME'
)
const MD_404_PATH = path.resolve(__dirname, 'public', 'template', '404.md')
const TARGET_MD_404_PATH = path.resolve(
  __dirname,
  '..',
  'frontend',
  'dist',
  '404.md'
)

async function generateCname() {
  const cnameTemplate = template(await syncReadFile(CNAME_FILE_PATH), {
    encoding: 'utf-8'
  })
  await mkDirAndCreateFile(TARGET_CNAME_FILE_PATH, cnameTemplate({ host: HOST_NAME }))
}

async function generate404Md() {
  const md404Template = template(await syncReadFile(MD_404_PATH), {
    encoding: 'utf-8'
  })
  await mkDirAndCreateFile(TARGET_MD_404_PATH, md404Template({ host: HOST_NAME }))
}

function generateHostFile(cb) {
  async function start() {
    if (HOST_NAME) {
      await generateCname()
      await generate404Md()
    }
    cb()
  }
  start()
}

module.exports = {
  generateHostFile
}
