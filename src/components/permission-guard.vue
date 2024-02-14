<script setup lang="ts">
import { computed } from 'vue'
import { Permission } from '@/types/auth.types'

type Props = {
  userPermissions?: readonly Permission[]
  accessPermissions: Permission[]
}

const props = withDefaults(defineProps<Props>(), {
  userPermissions: () => []
})

const hasPermissions = computed(() =>
  props.accessPermissions.every((p) => props.userPermissions.includes(p))
)
</script>

<template>
  <slot v-if="hasPermissions"></slot>
</template>
