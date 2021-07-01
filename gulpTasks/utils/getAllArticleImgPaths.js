const { promisify } = require('util')
const { join: joinPath } = require('path')
const fs = require('fs')

const readDir = promisify(fs.readdir)
const stats = promisify(fs.stat)
/**
 * 递归遍历某文件夹下除 README 外的所有 markdown 文件
 * @param {string} path
 * @returns {Array<string>} markdownPaths
 */
async function getAllArticleImgPaths(rootPath) {
  let res = []
  async function recursionPath(path) {
    let files = []
    try {
      files = await readDir(path)
    } catch (e) {
      console.error(e)
    }
    const len = files.length
    for (let i = 0; i < len; i++) {
      const filename = files[i]
      const filePath = joinPath(path, filename)
      const fileStats = await stats(filePath)
      const isFile = fileStats.isFile() // 是文件
      const isDir = fileStats.isDirectory() // 是文件
      if (isFile) {
        // 所有的 images 文件
        if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(filePath)) {
          res.push(filePath)
        }
      }
      if (isDir) {
        if (/\.git$/.test(filePath)) {
          console.log(`${filePath}是git文件夹, 不遍历`)
        } else {
          await recursionPath(filePath) // 递归，如果是文件夹，则继续遍历该文件夹
        }
      }
    }
    return res
  }
  await recursionPath(rootPath)
  return res
}

module.exports = getAllArticleImgPaths
