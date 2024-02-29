import { useQueryClient, useMutation } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import { userDeleteMutationKey } from '@/@common/constants/query-keys'
import { deleteUserApi } from '@/users/api'
import { refreshUsers } from '@/users/api-hooks/use-users'

export const useUserDelete = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: userDeleteMutationKey,
    mutationFn: deleteUserApi,
    onError: () => {
      toast.error('Could not delete user')
    },
    onSuccess: () => {
      refreshUsers(queryClient, toast)
      toast.success('User was removed')
    }
  })
}
