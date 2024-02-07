<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserProvider } from '@/hooks/contexts/user'
import Nav from './components/nav.vue'

useUserProvider()
</script>

<template>
  <header>
    <div>
      <Nav />
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
