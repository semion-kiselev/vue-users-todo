import { QueryClient, useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import { usersCacheKey } from '@/@common/constants/query-keys'
import { getUsersApi } from '@/users/api'
import { type ToastInterface } from 'vue-toastification'
import type { User } from '@/users/types'

export const useUsers = (): UseQueryReturnType<User[], Error> =>
  useQuery({
    queryKey: usersCacheKey,
    queryFn: ({ signal }) => getUsersApi(signal)
  })

export const refreshUsers = (queryClient: QueryClient, toast: ToastInterface) =>
  queryClient.invalidateQueries({ queryKey: usersCacheKey }, { throwOnError: true }).catch(() => {
    toast.error('Could not refresh users')
  })
