import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import { permissionsCacheKey } from '@/@common/constants/query-keys'
import { getPermissionsApi } from '@/auth/api'
import { type PermissionItem } from "@/auth/types";

export const usePermissions = (): UseQueryReturnType<PermissionItem[], Error> =>
  useQuery({
    queryKey: permissionsCacheKey,
    queryFn: ({ signal }) => getPermissionsApi(signal),
    staleTime: Infinity,
  })
