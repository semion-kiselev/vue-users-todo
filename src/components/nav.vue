<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { authService } from '@/services/auth'
import { useUserContext } from '@/hooks/contexts/user'
import PermissionGuard from '@/components/permission-guard.vue'
import { Permission } from '@/types/auth.types'
import { ABOUT_PAGE, HOME_PAGE, LOGIN_PAGE, USERS_PAGE } from '@/constants/route-names'

const { data: user, clearUser } = useUserContext()
const router = useRouter()
const route = useRoute()

const logout = () => {
  authService.removeToken()
  clearUser()
  if (route.meta?.permissions) {
    router.push(HOME_PAGE)
  }
}
</script>

<template>
  <nav class="nav flex justify-between">
    <div class="flex gap-2 text-blue-700">
      <RouterLink exactActiveClass="font-bold" :to="{ name: HOME_PAGE }">Home</RouterLink>
      <RouterLink exactActiveClass="font-bold" :to="{ name: ABOUT_PAGE }">About</RouterLink>
      <PermissionGuard :access-permissions="[Permission.UR]" :user-permissions="user?.permissions">
        <RouterLink exactActiveClass="font-bold" :to="{ name: USERS_PAGE }">Users</RouterLink>
      </PermissionGuard>
      <RouterLink
        v-if="!user"
        class="text-red-800"
        exactActiveClass="font-bold"
        :to="{ name: LOGIN_PAGE }"
        >Login</RouterLink
      >
      <button v-if="user" @click="logout" class="text-red-800">Logout</button>
    </div>
    <div v-if="user">{{ user.name }}</div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
