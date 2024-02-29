import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/@common/views/home-view.vue'
import { Permission } from '@/auth/types'
import { authService } from '@/auth/services/auth'
import {
  ABOUT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  USER_CREATE_PAGE,
  USER_UPDATE_PAGE,
  USERS_PAGE
} from '@/@common/constants/route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: HOME_PAGE,
      component: HomeView
    },
    {
      path: '/about',
      name: ABOUT_PAGE,
      component: () => import('@/@common/views/about-view.vue')
    },
    {
      path: '/login',
      name: LOGIN_PAGE,
      component: () => import('@/auth/views/login-view.vue')
    },
    {
      path: '/users',
      name: USERS_PAGE,
      meta: { permissions: [Permission.UR] },
      component: () => import('@/users/views/users-view.vue')
    },
    {
      path: '/users/create',
      name: USER_CREATE_PAGE,
      meta: { permissions: [Permission.UM] },
      component: () => import('@/users/views/user-create-view.vue')
    },
    {
      path: '/users/:id/update',
      name: USER_UPDATE_PAGE,
      meta: { permissions: [Permission.UM] },
      component: () => import('@/users/views/user-update-view.vue')
    }
  ]
})

router.beforeEach((to) => {
  const accessPermissions = to.meta.permissions as Permission[] | undefined
  if (!accessPermissions) {
    return true
  }

  const user = authService.getUserData()
  if (!user) {
    return { name: LOGIN_PAGE }
  }

  const hasPermissions = accessPermissions.every((p) => user.permissions.includes(p))
  if (!hasPermissions) {
    return { name: LOGIN_PAGE }
  }
})

export default router
