<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/users/api-hooks/use-user'
import { userFormSchema } from '@/users/components/forms/user'
import {computed, toRaw, toValue} from 'vue'
import type { UpdateUserData } from '@/users/types'
import { USERS_PAGE } from '@/@common/constants/route-names'
import { useUserUpdate } from '@/users/api-hooks/use-user-update'
import {usePermissions} from "@/auth/api-hooks/use-permissions";
import {getPermissionsOptions} from "@/users/utils";

const router = useRouter()
const { params } = useRoute()
const {
  data: user,
  isLoading: isUserLoading,
  isError: isUserLoadingError
} = useUser({ id: Number(params.id) })

const { mutate: updateUser, isPending } = useUserUpdate()

const { data: permissions } = usePermissions()
const permissionsOptions = computed(() => getPermissionsOptions(permissions))

console.log("permissionsOptions ", toValue(permissionsOptions))

const submitLabel = computed(() => (isPending.value ? 'Update ...' : 'Update'))

const initialFormData = computed(() => {
  if (!user.value) return {}
  return { id: user.value.id, name: user.value.name, email: user.value.email, permissions: user.value.permissions }
})

const handleSubmit = async (data: UpdateUserData) => {
  updateUser(
    { id: Number(params.id), data },
    {
      onSuccess() {
        router.push({ name: USERS_PAGE })
      }
    }
  )
}
</script>

<template>
  <h1 class="my-2 text-3xl">Update User {{ params.id }}</h1>
  <div v-if="isUserLoading">Loading user...</div>
  <div v-else-if="isUserLoadingError">Could not load user :(</div>
  <div v-else-if="initialFormData">
    <code>{{ JSON.stringify(user) }}</code>
    <FormKit type="form" @submit="handleSubmit" :actions="false" :value="initialFormData">
      <FormKitSchema :schema="userFormSchema" :data="{ permissionsOptions }" />
      <FormKit type="submit" :label="submitLabel" />
    </FormKit>
  </div>
</template>

<style scoped></style>
