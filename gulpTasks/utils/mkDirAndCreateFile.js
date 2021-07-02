const path = require('path')
const { promisify } = require('util')
const { writeFile, mkdir: mkdirSync } = require('fs')
const mkdir = promisify(mkdirSync)

async function mkDirAndCreateFile(fileName, data) {
  await mkdir(path.dirname(fileName), { recursive: true })
  writeFile(
    fileName,
    data,
    {
      encoding: 'utf-8',
      flag: 'w'
    },
    (err) => {
      if (err) throw err
      console.log(`The file ${fileName} has been created!`)
    }
  )
}

module.exports = mkDirAndCreateFile
