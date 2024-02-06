<script setup lang="ts">
import type { Permission } from '@/types/auth.types'

const props = defineProps<{
  userPermissions: Permission[]
  accessPermissions: Permission[]
}>()

const hasPermissions = props.accessPermissions.every((p) => props.userPermissions.includes(p))
</script>

<template>
  <slot v-if="hasPermissions"></slot>
</template>
