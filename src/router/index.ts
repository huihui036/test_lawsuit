import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/Register.vue')
  },
  {
    path: '/admin/addCase',
    name: 'addCase',
    component: () => import('@/views/admin/case/AddCase.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requireLogin: true,
      parent: '管理首页'
    },
    component: () => import('../views/admin/index.vue'),
    children: [
      {
        path: '/admin/caseList',
        name: 'caseList',
        component: () => import('../views/admin/case/CaseList.vue')
      },
      {
        path: '/admin/legalCaseDetails',
        name: 'legalCaseDetails',
        component: () => import('../views/admin/case/legalCaseDetails.vue')
      }
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
