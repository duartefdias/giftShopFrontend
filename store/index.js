import Vuex from 'vuex'

import Auth from './auth'


new Vuex.Store({
  state: () => ({
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
  }),
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth
  }
})
