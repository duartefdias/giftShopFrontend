import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _68de8641 = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages/About" */))
const _045b3aca = () => interopDefault(import('..\\pages\\Curator.vue' /* webpackChunkName: "pages/Curator" */))
const _cc37f496 = () => interopDefault(import('..\\pages\\Insert.vue' /* webpackChunkName: "pages/Insert" */))
const _523e041d = () => interopDefault(import('..\\pages\\Login.vue' /* webpackChunkName: "pages/Login" */))
const _42938806 = () => interopDefault(import('..\\pages\\Logout.vue' /* webpackChunkName: "pages/Logout" */))
const _160eab3e = () => interopDefault(import('..\\pages\\Manage.vue' /* webpackChunkName: "pages/Manage" */))
const _11244126 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
    component: _68de8641,
    name: "About"
  }, {
    path: "/Curator",
    component: _045b3aca,
    name: "Curator"
  }, {
    path: "/Insert",
    component: _cc37f496,
    name: "Insert"
  }, {
    path: "/Login",
    component: _523e041d,
    name: "Login"
  }, {
    path: "/Logout",
    component: _42938806,
    name: "Logout"
  }, {
    path: "/Manage",
    component: _160eab3e,
    name: "Manage"
  }, {
    path: "/",
    component: _11244126,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
