import { QueryClient, useQuery } from '@tanstack/vue-query'
import { usersCacheKey } from '@/@common/constants/query-keys'
import { getUsersApi } from '@/users/api'
import { type ToastInterface } from 'vue-toastification'

export const useUsers = () =>
  useQuery({
    queryKey: usersCacheKey,
    queryFn: ({ signal }) => getUsersApi(signal)
  })

export const refreshUsers = (queryClient: QueryClient, toast: ToastInterface) =>
  queryClient.invalidateQueries({ queryKey: usersCacheKey }, { throwOnError: true }).catch(() => {
    toast.error('Could not refresh users')
  })
