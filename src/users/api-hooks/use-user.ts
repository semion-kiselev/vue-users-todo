import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import { userCacheKey } from '@/@common/constants/query-keys'
import { getUserApi } from '@/users/api'
import type { GetUserApiParams, User } from '@/users/types'

export const useUser = (params: GetUserApiParams): UseQueryReturnType<User, Error> =>
  useQuery({
    queryKey: userCacheKey,
    queryFn: ({ signal }) => getUserApi(params, signal)
  })
