import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    simpleSearch: '',
    advancedSearch: {
      title: '',
      priceRange: [null, null],
      category: ''
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
