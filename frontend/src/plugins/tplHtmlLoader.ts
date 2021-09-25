/**
 *  转义函数:
 *  v2.0 使用 base64 + encodeURIComponent 达成特殊符号转义
 * */
function stripscript(str: string) {
  str = Buffer.from(encodeURIComponent(str)).toString('base64')
  return str
}

// 自定义 vite 插件
// https://cn.vitejs.dev/guide/api-plugin.html#importing-a-virtual-file
export default function resumeLoaderPlugin() {
  return {
    name: 'transform-resume-file',
    transform(src: string, id: string) {
      const tplFileRegex = /\.tpl\.html$/
      if (tplFileRegex.test(id)) {
        return {
          code: 'export default ' + `'${stripscript(src)}'`
        }
      }
    }
  }
}
