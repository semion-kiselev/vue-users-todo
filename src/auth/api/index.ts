import { client } from '@/@common/api/client'
import type {LoginApiParams, LogoutApiParams, PermissionItem} from '@/auth/types'
import {sleep} from "@/@common/utils/sleep";

export const loginApi = (params: LoginApiParams) =>
  client
    .post('auth/login', {
      json: params
    })
    .json<{ token: string }>()

export const logoutApi = (params: LogoutApiParams) =>
  client.post('auth/logout', {
    json: { id: params.userId }
  })

export const getPermissionsApi = async (signal?: AbortSignal) => {
  await sleep()
  return client.get('permissions', { signal }).json<PermissionItem[]>()
}
