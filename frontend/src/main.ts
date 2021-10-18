import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import '@/assets/style/reset.scss'
import '@/assets/style/scrollBar.scss'
import '@/assets/style/icon.scss'

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')

if (import.meta.env.DEV) {
  ;(async () => {
    const eruda = (await import('eruda')).default
    eruda.init()
  })()
}
