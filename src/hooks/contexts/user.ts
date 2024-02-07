import {type InjectionKey, provide, readonly, type Ref, type DeepReadonly, ref, inject} from 'vue'
import { authService } from '@/services/auth'
import type { UserFromToken } from '@/types/auth.types'

type UserContext = {
  data: Readonly<Ref<DeepReadonly<UserFromToken> | null>>
  clearUser: () => void
  updateUser: (userData: UserFromToken) => void
}

const USER_KEY: InjectionKey<UserContext> = Symbol('user')

export const useUserProvider = () => {
  const user = ref(authService.getUserData())

  const clearUser = () => {
    user.value = null
  }

  const updateUser = (userData: UserFromToken) => {
    user.value = userData
  }

  provide(USER_KEY, {
    data: readonly(user),
    clearUser,
    updateUser
  })
}

export const useUserContext = () => {
  const user = inject(USER_KEY);
  if (!user) {
    throw new Error('User context should exist');
  }
  return user;
}


