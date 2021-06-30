const del = require('del')

const generateDelTask = (path = [], opts = {}) => function clean (cb) {
  if (!path || (Array.isArray(path) && path.length === 0) || (!Array.isArray(path) && typeof path !== 'string')) {
    cb()
    return
  }
  console.log(`clean path: ${path}`)
  del(path, { force: true, ...opts })
  cb()
}

module.exports = {
  generateDelTask
}
