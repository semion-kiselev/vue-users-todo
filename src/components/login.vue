<script setup lang="ts">
import { useLogin } from '@/api-hooks/use-login'
import { loginFormSchema } from '@/forms/login'
import { FormKit, FormKitSchema } from '@formkit/vue'
import type {LoginApiParams} from "@/api/types";
import {useUserContext} from "@/hooks/contexts/user";

const { updateUser } = useUserContext();
const { mutate: login } = useLogin(updateUser);

const handleSubmit = (data: LoginApiParams) => {
  login(data);
}
</script>

<template>
  <h1 class="my-2 text-3xl">Login</h1>

  <FormKit type="form" @submit="handleSubmit">
    <FormKitSchema :schema="loginFormSchema" />
  </FormKit>
</template>

<style scoped></style>
