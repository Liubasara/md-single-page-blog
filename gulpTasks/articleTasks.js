const path = require('path')
const markdownToJSON = require('gulp-markdown-to-json')
const marked = require('marked')
const { src, dest, series, parallel, watch } = require('gulp')
const getAllArticlePaths = require('./utils/getAllArticlePaths')
const getAllArticleImgPaths = require('./utils/getAllArticleImgPaths')
const mkDirAndCreateFile = require('./utils/mkDirAndCreateFile')
const {
  addParamsToJsonPlugin,
  addRelativeUrl,
  changeBodyToBase64,
  addRelativeDirUrl,
  ensureTimeExist
} = require('./utils/addParamsToJsonPlugin')
const { generateDelTask } = require('./helperTasks')
const hljs = require('highlight.js')

const TARGET_PATH = path.resolve(__dirname, '..', 'article', 'dist')
const ARTICLE_PATH =
  process.env.blogArticlePath ||
  path.resolve(__dirname, '..', 'article', 'demo')

const ALL_ARTICLE_PKG_TARGET_PATH = path.resolve(TARGET_PATH, 'allArticle') // 所有单独文章内容
const ALL_ARTICLE_CONTENTS_TARGET_PATH = path.resolve(
  TARGET_PATH,
  'allContents',
  'allContents.json'
) // 单数组包含所有文章内容
const ALL_ARTICLE_DIRECTORY_TARGET_PATH = path.resolve(
  TARGET_PATH,
  'directory',
  'directory.json'
) // 单数组所有文章不包含内容的目录

const CLEAN_PATH = path.resolve(TARGET_PATH, '**')

async function generateArticleToJsTask() {
  const allArticlePaths = await getAllArticlePaths(ARTICLE_PATH)
  console.log('getMarkdown', allArticlePaths)

  const rendererMD = new marked.Renderer()
  marked.setOptions({
    renderer: rendererMD,
    highlight: function (code, language) {
      try {
        return hljs.highlight(code, { language }).value
      } catch (e) {
        const languageMap = {
          conf: ['nginx', 'ini']
        }
        if (languageMap[language]) {
          for (let tryExt of languageMap[language]) {
            try {
              const res = hljs.highlight(code, { language: tryExt }).value
              console.log(`highlight: not found language ${language}, use ${tryExt} instead`)
              return res
            } catch (e) {}
          }
        }
        console.log(`highlight: not found language ${language}, use txt instead`)
        return hljs.highlight(code, { language: 'txt' }).value
      }
    },
    gfm: true, //默认为true。 允许 Git Hub标准的markdown.
    tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
    breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
    pedantic: false, //默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
    smartLists: true,
    smartypants: true, //使用更为时髦的标点，比如在引用语法中加入破折号。
    langPrefix: 'hljs language-'
  })
  const markdownTask = src(allArticlePaths, { base: ARTICLE_PATH })
    .pipe(markdownToJSON(marked))
    .pipe(
      addParamsToJsonPlugin(
        addRelativeUrl, // 添加 url 属性
        changeBodyToBase64, // 将 body 属性修改为 base64 防止打包失败
        addRelativeDirUrl, // 添加 dirUrl 属性
        ensureTimeExist // 确保 time 属性存在，若不存在则创建
      )
    )
  const allContents = []
  const directory = []
  markdownTask.on('data', function (file) {
    const contents = JSON.parse(file.contents.toString())
    allContents.push(contents)
    directory.push({ ...contents, body: undefined })
  })
  markdownTask.on('end', () => {
    // 以降序排序
    ;[allContents, directory].forEach((arr) => {
      arr.sort((a, b) => {
        return +new Date(b.time) - new Date(a.time)
      })
    })
    mkDirAndCreateFile(
      ALL_ARTICLE_CONTENTS_TARGET_PATH,
      JSON.stringify(allContents)
    )
    mkDirAndCreateFile(
      ALL_ARTICLE_DIRECTORY_TARGET_PATH,
      JSON.stringify(directory)
    )
  })
  return markdownTask.pipe(dest(ALL_ARTICLE_PKG_TARGET_PATH))
}

async function generateArticleImgTask() {
  const allArticleImgPaths = await getAllArticleImgPaths(ARTICLE_PATH)
  console.log('getMarkdownImage', allArticleImgPaths)
  return src(allArticleImgPaths, { base: ARTICLE_PATH }).pipe(
    dest(ALL_ARTICLE_PKG_TARGET_PATH)
  )
}

const buildArticleTask = series(
  generateDelTask(CLEAN_PATH),
  parallel(generateArticleToJsTask, generateArticleImgTask)
)

module.exports = {
  buildArticleTask,
  buildArticleTaskDev: function (cb) {
    parallel(buildArticleTask)()
    const watcher = watch([ARTICLE_PATH])
    watcher.on('change', function () {
      parallel(buildArticleTask)()
    })
    cb()
  }
}
