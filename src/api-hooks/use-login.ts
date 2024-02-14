import { useMutation } from '@tanstack/vue-query'
import { loginMutationKey } from '@/constants/query-keys'
import { loginApi } from '@/api'
import type { LoginApiParams } from '@/api/types'

export const useLogin = () => {
  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: (params: LoginApiParams) => loginApi(params),
    onSuccess(data) {
      console.log('token ', data.token)
    },
    onError() {
      // show notification
    }
  })
};

