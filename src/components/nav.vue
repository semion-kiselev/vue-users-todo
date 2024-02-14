<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {authService} from '@/services/auth'
import {useUserContext} from "@/hooks/contexts/user";
import PermissionGuard from "@/components/permission-guard.vue";
import {Permission} from "@/types/auth.types";

const { data: user, clearUser } = useUserContext()

const logout = () => {
  authService.removeToken()
  clearUser();
  // todo: if protected route (use meta?) - redirect home, if not - stay as is
}
</script>

<template>
  <nav class="nav">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
    <PermissionGuard :access-permissions="[Permission.UR]" :user-permissions="user?.permissions">
      <RouterLink :to="{ name: 'users' }">Users</RouterLink>
    </PermissionGuard>
    <RouterLink v-if="!user" :to="{ name: 'login' }">Login</RouterLink>
    <button v-if="user" @click="logout">Logout</button>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
