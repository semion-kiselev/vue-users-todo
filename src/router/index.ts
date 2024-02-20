import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import { Permission } from '@/types/auth.types'
import { authService } from '@/services/auth'
import { ABOUT_PAGE, HOME_PAGE, LOGIN_PAGE, USERS_PAGE } from '@/constants/route-names'

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
      component: () => import('../views/about-view.vue')
    },
    {
      path: '/login',
      name: LOGIN_PAGE,
      component: () => import('../views/login-view.vue')
    },
    {
      path: '/users',
      name: USERS_PAGE,
      meta: { permissions: [Permission.UR] },
      component: () => import('../views/users-view.vue')
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
