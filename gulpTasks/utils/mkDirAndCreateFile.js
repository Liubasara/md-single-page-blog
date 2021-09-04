const path = require('path')
const { promisify } = require('util')
const { writeFile: writeFileSync, mkdir: mkdirSync } = require('fs')
const mkdir = promisify(mkdirSync)
const writeFile = promisify(writeFileSync)

async function mkDirAndCreateFile(fileName, data) {
  await mkdir(path.dirname(fileName), { recursive: true })
  try {
    await writeFile(fileName, data, {
      encoding: 'utf-8',
      flag: 'w'
    })
  } catch (e) {
    console.log(`The file ${fileName} has been created!`)
  }
}

module.exports = mkDirAndCreateFile
