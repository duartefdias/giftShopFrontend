import Vuex from 'vuex'

import Auth from './auth'
import Items from './items'


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
  getters: {
    categoriesList: () => state.categories
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Items
  }
})
