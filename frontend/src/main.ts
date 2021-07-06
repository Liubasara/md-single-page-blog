import { createApp } from 'vue'
import App from './App.vue'
import demoApp from './demoApp.vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'

interface stateInterface {
  count: number;
}

const store = createStore<stateInterface>({
  state () {
    const _state: stateInterface = {
      count: 0
    }
    return _state
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: demoApp }
  ]
})

const app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
