import { useMutation } from '@tanstack/vue-query'
import { logoutMutationKey } from '@/constants/query-keys'
import { logoutApi } from '@/api'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '@/services/auth'
import { HOME_PAGE } from '@/constants/route-names'
import { useToast } from 'vue-toastification'
import {useUserContext} from "@/hooks/contexts/user";
import type {LogoutApiParams} from "@/api/types";

export const useLogout = () => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()
  const { clearUser } = useUserContext();

  return useMutation({
    mutationKey: logoutMutationKey,

    mutationFn: (params: LogoutApiParams) => logoutApi(params),

    onSuccess() {
      authService.removeToken();
      clearUser();

      if (route.meta?.permissions) {
        router.push(HOME_PAGE)
      }
    },

    onError() {
      toast.error('Could not logout user')
    }
  })
}
