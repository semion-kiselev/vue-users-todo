import { client } from './client'
import type {LoginApiParams} from "@/api/types";

export const loginApi = (params: LoginApiParams) => client.post('auth/login', {
  json: params,
}).json<{ token: string }>();

export const logoutApi = () => client.get('logout').json();

