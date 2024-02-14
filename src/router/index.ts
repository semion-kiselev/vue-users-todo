import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import { Permission } from '@/types/auth.types'
import { authService } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about-view.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login-view.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: { permissions: [Permission.UR] },
      component: () => import('../views/users-view.vue')
    }
  ]
})

router.beforeEach((to) => {
  const accessPermissions = to.meta.permissions as Permission[] | undefined;
  if (!accessPermissions) {
    return true;
  }

  const user = authService.getUserData()
  if (!user) {
    return { name: 'login' }
  }

  const hasPermissions = accessPermissions.every((p) => user.permissions.includes(p))
  if (!hasPermissions) {
    return { name: 'login' }
  }
})

export default router
