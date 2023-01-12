export const ADD_COUNT = 'ADD_COUNT'

export default {
  state: {
    title: 'Implement vuex basic concepts',
    count: 0,
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
  mutations: {
    [ADD_COUNT](state, payload) {
      state.count += payload
    },
  },
  actions: {
    [ADD_COUNT]({ commit }, payload) {
      setTimeout(() => {
        commit(ADD_COUNT, payload)
      }, 300)
    },
  },
}
