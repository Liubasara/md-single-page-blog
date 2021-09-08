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
  ensureTimeExist,
  ensureRequireParamsExist
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

function generateArticleToJsTask(cb) {
  start()
  async function start() {
    const allArticlePaths = await getAllArticlePaths(ARTICLE_PATH)
    console.log('getMarkdown', allArticlePaths)

    const rendererMD = new marked.Renderer()
    // 生成标题锚点
    // https://github.com/nodejs/nodejs.org/blob/d24e6a85e5/scripts/plugins/anchor-markdown-headings.js
    const ANCHOR_COMMENTREG = /<!--\x20?([\w\x20-]+)\x20?-->/
    rendererMD.heading = function anchorMarkdownHeadings(
      text,
      level,
      raw,
      slugger
    ) {
      let anchorTitle = null

      // If we've checked the title has a comment symbol,
      // we reguard it as the forcely-assigned anchor link name
      // for titles with non-English characters
      const anchorTitleArray = ANCHOR_COMMENTREG.exec(raw)
      if (anchorTitleArray !== null) {
        anchorTitle = anchorTitleArray[1]
      } else {
        anchorTitle = raw
      }

      // anchorTitle = anchorTitle
      //   .replace(/(\[([^\]]+)]\([^)]+\))/g, '$2')
      //   .replace(/[^\w]+/g, '-')
      //   .replace(/[\x20]+/g, '-')
      //   .replace(/-{2,}/g, '-')
      //   .replace(/(^-|-$)/g, '')

      if (!anchorTitle) {
        return `<h${level}>${text}</h${level}>`
      }

      anchorTitle = anchorTitle.toLowerCase()

      const anchorId = `${slugger ? slugger.slug(anchorTitle) : anchorTitle}`
      const headerId = `header-${anchorId}`

      // return `<h${level} id="${headerId}">${text}<a id="${anchorId}" class="anchor" href="#${anchorId}"></a></h${level}>`
      return `<h${level} id="${headerId}" class="anchor-header"><a id="${anchorId}" class="anchor">#</a>${text}</h${level}>`
    }
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
                console.log(
                  `highlight: not found language ${language}, use ${tryExt} instead`
                )
                return res
              } catch (e) {}
            }
          }
          console.log(
            `highlight: not found language ${language}, use txt instead`
          )
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
          ensureTimeExist, // 确保 time 属性存在，若不存在则创建
          ensureRequireParamsExist // 确保所有必须属性都存在, 若不存在则报错
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
    const destTask = markdownTask.pipe(dest(ALL_ARTICLE_PKG_TARGET_PATH))
    destTask.on('end', cb)
  }
}

function generateArticleImgTask(cb) {
  start()
  async function start() {
    const allArticleImgPaths = await getAllArticleImgPaths(ARTICLE_PATH)
    console.log('getMarkdownImage', allArticleImgPaths)
    src(allArticleImgPaths, { base: ARTICLE_PATH })
      .pipe(dest(ALL_ARTICLE_PKG_TARGET_PATH))
      .on('end', cb)
  }
}

const buildArticleTask = series(
  generateDelTask(CLEAN_PATH),
  parallel(generateArticleToJsTask, generateArticleImgTask)
)

module.exports = {
  buildArticleTask,
  buildArticleTaskDev: function (cb) {
    series(buildArticleTask, function watchArticleChange(cbb) {
      cb()
      const watcher = watch([ARTICLE_PATH])
      watcher.on('change', function () {
        series(buildArticleTask)()
      })
      cbb()
    })()
  }
}
