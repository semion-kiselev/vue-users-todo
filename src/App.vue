<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserProvider } from '@/auth/composables/contexts/user'
import Nav from '@/@common/components/nav.vue'

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
