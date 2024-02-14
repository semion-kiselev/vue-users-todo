<script setup lang="ts">
import { useLogin } from '@/api-hooks/use-login'
import { loginFormSchema } from '@/forms/login'
import { FormKit, FormKitSchema } from '@formkit/vue'

console.log({ loginFormSchema })

const { mutate: login } = useLogin()

const handleSubmit = (data: any) => {
  console.log({ data })
}
</script>

<template>
  <h1 class="my-2 text-3xl">Login</h1>

  <FormKit type="form" @submit="handleSubmit">
    <FormKitSchema :schema="loginFormSchema" />
  </FormKit>
</template>

<style scoped></style>
