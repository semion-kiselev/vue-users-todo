<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserProvider } from '@/hooks/contexts/user'
import Nav from './components/nav.vue'

useUserProvider()
</script>

<template>
  <div class="p-4">
    <header>
      <div>
        <Nav />
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
