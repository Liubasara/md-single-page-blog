import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

const ROOT_PATH = path.resolve('..')
const ARTICLE_DIST = path.resolve(ROOT_PATH, 'article', 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx(), vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      articleDist: ARTICLE_DIST
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  // server: {
  //   fsServe: {
  //     strict: true,
  //     root: ROOT_PATH
  //   }
  // }
})
