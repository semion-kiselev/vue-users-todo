import { client } from '@/@common/api/client'
import type { LoginApiParams, LogoutApiParams } from '@/auth/types'

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
