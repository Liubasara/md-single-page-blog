import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import '@/assets/style/reset.scss'

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
