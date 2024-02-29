import { client } from '@/@common/api/client'
import type {User, CreateUserData, UpdateUserApiParams, DeleteUserApiParams, GetUserApiParams} from '@/users/types'
import { sleep } from '@/@common/utils/sleep'

export const getUsersApi = async (signal?: AbortSignal) => {
  await sleep()
  return client.get('users', { signal }).json<User[]>()
}

export const getUserApi = async ({ id }: GetUserApiParams, signal?: AbortSignal) => {
  await sleep()
  return client.get(`users/${id}`, { signal }).json<User>()
}

export const createUserApi = async (data: CreateUserData) => {
  await sleep()
  client.post('users', { json: data }).json<User>()
}

export const updateUserApi = async ({ id, data }: UpdateUserApiParams) => {
  await sleep()
  client.put(`users/${id}`, { json: data }).json<User>()
}

export const deleteUserApi = async ({ id }: DeleteUserApiParams) => {
  await sleep()
  client.delete(`users/${id}`)
}
