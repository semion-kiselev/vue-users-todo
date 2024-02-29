import { useQuery } from '@tanstack/vue-query'
import { permissionsCacheKey } from '@/@common/constants/query-keys'
import { getPermissionsApi } from '@/auth/api'

export const usePermissions = () =>
  useQuery({
    queryKey: permissionsCacheKey,
    queryFn: ({ signal }) => getPermissionsApi(signal),
    staleTime: Infinity,
  })
