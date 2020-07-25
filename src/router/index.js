import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Main from '../views/Main.vue'
import Manage from '../views/Manage.vue'
import Insert from '@/views/Insert'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Curator from '@/views/Curator'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage
  },
  {
    path: '/insert',
    name: 'insert',
    component: Insert,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Curator',
    name: 'curator',
    component: Curator,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to the Login Page
      next('/profile');
    } else {
      next();
    }
  } else {
    next()
  }
});

export default router
