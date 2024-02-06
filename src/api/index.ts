import { client } from './client'

export const loginApi = () => client.get('login').json();
export const logoutApi = () => client.get('logout').json();

