<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { authService } from '@/services/auth'
import {useUserContext} from "@/hooks/contexts/user";

const { data: user, clearUser } = useUserContext()

const logout = () => {
  authService.removeToken()
  clearUser();
  // todo: if protected route (use meta?) - redirect home, if not - stay as is
}

// todo: protect routes, use meta & middleware
</script>

<template>
  <nav class="nav">
    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
    <RouterLink :to="{ name: 'about' }">About</RouterLink>
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
