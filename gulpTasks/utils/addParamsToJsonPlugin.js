// 为每个文章生成的 JSON 添加属性的 gulp 插件
const through2 = require('through2')
const PluginError = require('plugin-error')
const path = require('path')

/**
 *
 * @param  {...Function} args
 * @returns
 */
function addParamsToJsonPlugin(...args) {
  const handlerFuncs = []
  args.forEach((func) => {
    if (typeof func !== 'function') {
      console.error(`handler ${func} 不是可执行的函数`)
      return
    }
    handlerFuncs.push(func)
  })

  const stream = through2.obj(async function (input, encoding, callback) {
    try {
      let inputContentObj = JSON.parse(input.contents.toString())
      handlerFuncs.forEach((func) => {
        func(inputContentObj, input)
      })
      input.contents = Buffer.from(JSON.stringify(inputContentObj))
      this.push(input)
      callback()
    } catch (e) {
      callback(new PluginError(e))
    }
  })
  return stream
}

const addRelativeUrl = (fileObj, file) => {
  fileObj.url = path.relative(file.base, file.path)
}

const addRelativeDirUrl = (fileObj, file) => {
  fileObj.dirUrl = path.relative(file.base, path.dirname(file.path))
}

const changeBodyToBase64 = (fileObj) => {
  fileObj.body = Buffer.from(encodeURIComponent(fileObj.body)).toString('base64')
}

const ensureTimeExist = (fileObj) => {
  if (fileObj.time) return
  fileObj.time = new Date().toLocaleDateString()
}

module.exports = {
  addParamsToJsonPlugin,
  addRelativeUrl,
  addRelativeDirUrl,
  changeBodyToBase64,
  ensureTimeExist
}
