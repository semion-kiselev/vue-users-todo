<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { userFormSchema } from '@/users/components/forms/user'
import type { CreateUserData } from '@/users/types'
import { useUserCreate } from '@/users/api-hooks/use-user-create'
import { USERS_PAGE } from '@/@common/constants/route-names'

const router = useRouter()
const { mutate: createUser, isPending } = useUserCreate()
const submitLabel = computed(() => (isPending.value ? 'Create ...' : 'Create'))

const handleSubmit = async (data: CreateUserData) => {
  createUser(data, {
    onSuccess() {
      router.push({ name: USERS_PAGE })
    },
  })
}
</script>

<template>
  <h1 class="my-2 text-3xl">Create User</h1>

  <FormKit type="form" @submit="handleSubmit" :actions="false">
    <FormKitSchema :schema="userFormSchema" />
    <FormKit type="submit" :label="submitLabel" />
  </FormKit>
</template>

<style scoped></style>
