import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { UserData } from '@/api/login/loginTypes'
import { requestData, getStorageData } from '@/hooks/common'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'login' },
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
    meta: { requireLogin: true, parent: '案件中心', title: '案件列表' },
    component: () => import('@/views/admin/case/AddCase.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requireLogin: true,
      parent: '首页'
    },
    component: () => import('../views/admin/index.vue'),
    children: [
      {
        path: '/admin/caseList',
        name: 'caseList',
        meta: { requireLogin: true, parent: '案件管理', title: '案件列表' },
        component: () => import('../views/admin/case/CaseList.vue')
      },
      {
        path: '/admin/userData',
        name: 'userData',
        meta: { requireLogin: true, parent: '个人设置', title: '用户信息' },
        component: () => import('@/views/admin/userPage/userData.vue')
      },
      {
        path: '/admin/changUserData',
        name: 'changUserData',
        meta: { requireLogin: true, parent: '个人设置', title: '修改密码' },
        component: () => import('@/views/admin/userPage/changData.vue')
      },
      {
        path: '/admin/userList',
        name: 'userList',
        meta: { requireLogin: true, parent: '用户列表', title: '用户列表' },
        component: () => import('@/views/admin/system/userList.vue')
      },
      {
        path: '/admin/examine',
        name: 'userExamine',
        meta: { requireLogin: true, parent: '用户列表', title: '用户审核' },
        component: () => import('@/views/admin/system/userListData.vue')
      },
      {
        path: '/admin/legalCaseDetails',
        name: 'legalCaseDetails',
        meta: { requireLogin: true, parent: '案件管理', title: '案件详情' },
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
// const authUserDepartment = getStorageData<UserData>('userData')
// if (authUserDepartment) {
//   config.headers.token = authUserDepartment.token
// }
router.beforeEach((to, form, next) => {
  const authUserDepartment = getStorageData<UserData>('userData')
  if (to.meta.requireLogin && !authUserDepartment) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
