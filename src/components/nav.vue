<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserContext } from '@/hooks/contexts/user'
import PermissionGuard from '@/components/permission-guard.vue'
import { Permission } from '@/types/auth.types'
import { ABOUT_PAGE, HOME_PAGE, LOGIN_PAGE, USERS_PAGE } from '@/constants/route-names'
import { useLogout } from '@/api-hooks/use-logout'
import { computed } from 'vue'

const { data: user } = useUserContext()
const { mutate: logout, isPending } = useLogout()
const logoutLabel = computed(() => (isPending.value ? 'Logout...' : 'Logout'))

const handleLogout = () => {
  if (typeof user.value?.id !== 'number') {
    throw new Error('Logout: user id should exist')
  }
  logout({ userId: user.value?.id })
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
      <button v-if="user" @click="handleLogout" class="text-red-800">{{ logoutLabel }}</button>
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
