import { useMutation } from '@tanstack/vue-query'
import { logoutMutationKey } from '@/@common/constants/query-keys'
import { logoutApi } from '@/auth/api'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '@/auth/services/auth'
import { HOME_PAGE } from '@/@common/constants/route-names'
import { useToast } from 'vue-toastification'
import { useUserContext } from '@/auth/composables/contexts/user'
import type { LogoutApiParams } from '@/auth/types'

export const useLogout = () => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  const { clearUser } = useUserContext()

  return useMutation({
    mutationKey: logoutMutationKey,

    mutationFn: (params: LogoutApiParams) => logoutApi(params),

    onSuccess() {
      authService.removeToken()
      clearUser()

      if (route.meta?.permissions) {
        router.push(HOME_PAGE)
      }
    },

    onError() {
      toast.error('Could not logout user')
    }
  })
}
