import { createStore } from 'vuex'

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

export default store
