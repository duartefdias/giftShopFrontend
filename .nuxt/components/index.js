export { default as Footer } from '../..\\components\\Footer.vue'
export { default as Item } from '../..\\components\\Item.vue'
export { default as Navbar } from '../..\\components\\Navbar.vue'
export { default as Searchbar } from '../..\\components\\Searchbar.vue'
export { default as Stack } from '../..\\components\\Stack.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

export const LazyFooter = import('../..\\components\\Footer.vue' /* webpackChunkName: "components_Footer" */).then(c => c.default || c)
export const LazyItem = import('../..\\components\\Item.vue' /* webpackChunkName: "components_Item" */).then(c => c.default || c)
export const LazyNavbar = import('../..\\components\\Navbar.vue' /* webpackChunkName: "components_Navbar" */).then(c => c.default || c)
export const LazySearchbar = import('../..\\components\\Searchbar.vue' /* webpackChunkName: "components_Searchbar" */).then(c => c.default || c)
export const LazyStack = import('../..\\components\\Stack.vue' /* webpackChunkName: "components_Stack" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components_VuetifyLogo" */).then(c => c.default || c)
