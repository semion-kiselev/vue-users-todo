<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserProvider } from '@/auth/composables/contexts/user'
import Nav from '@/@common/components/nav.vue'
import { usePermissions } from "@/auth/api-hooks/use-permissions";

useUserProvider()
const { data: permissions, isLoading, isLoadingError } = usePermissions();
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isLoadingError">Permissions loading error</div>
  <template v-else-if="permissions">
    <div class="p-4">
      <header>
        <div>
          <Nav />
        </div>
      </header>

      <RouterView />
    </div>
  </template>
</template>

<style scoped></style>
