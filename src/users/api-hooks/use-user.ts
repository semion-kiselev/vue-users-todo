import { useQuery } from '@tanstack/vue-query'
import { userCacheKey } from '@/@common/constants/query-keys'
import { getUserApi } from '@/users/api'
import type { GetUserApiParams } from '@/users/types'

export const useUser = (params: GetUserApiParams) =>
  useQuery({
    queryKey: userCacheKey,
    queryFn: ({ signal }) => getUserApi(params, signal)
  })
