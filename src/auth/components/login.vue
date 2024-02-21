<script setup lang="ts">
import { useLogin } from '@/auth/api-hooks/use-login'
import { loginFormSchema } from '@/auth/components/forms/login'
import { FormKit, FormKitSchema } from '@formkit/vue'
import type { LoginApiParams } from '@/auth/types'
import { computed } from 'vue'

const { mutate: login, isPending } = useLogin()
const submitLabel = computed(() => (isPending.value ? 'Login ...' : 'Login'))

const handleSubmit = async (data: LoginApiParams) => {
  login(data)
}
</script>

<template>
  <h1 class="my-2 text-3xl">Login</h1>

  <FormKit type="form" @submit="handleSubmit" :actions="false">
    <FormKitSchema :schema="loginFormSchema" />
    <FormKit type="submit" :label="submitLabel" />
  </FormKit>
</template>

<style scoped></style>
