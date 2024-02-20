import { useMutation } from '@tanstack/vue-query'
import { loginMutationKey } from '@/constants/query-keys'
import { loginApi } from '@/api'
import type { LoginApiParams } from '@/api/types'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '@/services/auth'
import type {UserFromToken} from "@/types/auth.types";

export const useLogin = (updateUser: (userData: UserFromToken) => void) => {
  const router = useRouter()
  const route = useRoute()

  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: (params: LoginApiParams) => loginApi(params),
    onSuccess(data) {
      authService.setToken(data.token)
      const userData = authService.getUserData()
      if (userData) {
        updateUser(userData)
      }
      router.push((route.redirectedFrom?.name as string) || 'home')
    },
    onError() {
      console.log('err')
    }
  })
}
