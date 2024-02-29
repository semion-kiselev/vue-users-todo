import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { userCreateMutationKey } from '@/@common/constants/query-keys'
import { createUserApi } from '@/users/api'

export const useUserCreate = () => {
  const toast = useToast()
  return useMutation({
    mutationKey: userCreateMutationKey,
    mutationFn: createUserApi,
    onError: () => {
      toast.error('Could not create user')
    },
    onSuccess: () => {
      toast.success('User was successfully created')
    }
  })
}
