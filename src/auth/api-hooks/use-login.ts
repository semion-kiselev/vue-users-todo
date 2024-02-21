import { useMutation } from '@tanstack/vue-query'
import { loginMutationKey } from '@/@common/constants/query-keys'
import { loginApi } from '@/auth/api'
import type { LoginApiParams } from '@/auth/types'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '@/auth/services/auth'
import { HOME_PAGE } from '@/@common/constants/route-names'
import { useToast } from 'vue-toastification'
import { useUserContext } from '@/auth/composables/contexts/user'

export const useLogin = () => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  const { updateUser } = useUserContext()

  return useMutation({
    mutationKey: loginMutationKey,

    mutationFn: (params: LoginApiParams) => loginApi(params),

    onSuccess(data) {
      authService.setToken(data.token)
      const userData = authService.getUserData()
      if (userData) {
        updateUser(userData)
      }
      router.push((route.redirectedFrom?.name as string) || HOME_PAGE)
    },

    onError() {
      toast.error('Could not authenticate')
    }
  })
}
