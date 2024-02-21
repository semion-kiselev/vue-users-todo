import { client } from './client'
import type {LoginApiParams, LogoutApiParams} from "@/api/types";

export const loginApi = (params: LoginApiParams) => client.post('auth/login', {
  json: params,
}).json<{ token: string }>();

export const logoutApi = (params: LogoutApiParams) => client.post('auth/logout', {
  json: { id: params.userId }
});



