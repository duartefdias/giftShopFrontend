import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    simpleSearch: '',
    advancedSearch: {
      title: '',
      priceRange: [null, null],
      category: ''
    },
    categories: [
        'tech',
        'weird',
        'prank',
        'food',
        'pets',
        'clothing',
        'books',
        'home',
        'office',
        'games',
        'sports',
        'man',
        'woman',
        'boy',
        'girl'
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth
  }
})
