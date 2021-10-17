import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import html from 'vite-plugin-html'
import tplHtmlLoader from './src/plugins/tplHtmlLoader'

const ROOT_PATH = path.resolve('..')
const ARTICLE_DIST = path.resolve(ROOT_PATH, 'article', 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    vue(),
    html({
      inject: {
        data: {
          blogTitle: process.env.blogTitle || 'blogTitle',
          blogFavIconPath: process.env.blogFavIconPath || '/favicon.ico'
        }
      },
      minify: true
    }),
    tplHtmlLoader()
  ],
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
  server: {
    fs: {
      allow: ['../']
    }
  }
})
