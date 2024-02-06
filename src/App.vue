<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { authService } from '@/services/auth'

const user = ref(authService.getUserData())
// todo: provide user down with api to set user after login (or use pinia?)

const logout = () => {
  authService.removeToken()
  user.value = null
  // todo: if protected route (use meta?) - redirect home, if not - stay as is
}

// todo: protect routes, use meta & middleware
</script>

<template>
  <header>
    <div>
      <nav class="nav">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink v-if="!user" :to="{ name: 'login' }">Login</RouterLink>
        <button v-if="user" @click="logout">Logout</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
