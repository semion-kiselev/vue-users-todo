import { useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { userUpdateMutationKey } from '@/@common/constants/query-keys'
import { updateUserApi } from '@/users/api'

export const useUserUpdate = () => {
  const toast = useToast()
  return useMutation({
    mutationKey: userUpdateMutationKey,
    mutationFn: updateUserApi,
    onError: () => {
      toast.error('Could not update user')
    },
    onSuccess: () => {
      toast.success('User was successfully updated')
    }
  })
}
