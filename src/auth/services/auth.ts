import { type TokenPayload, type UserFromToken } from '@/auth/types'

type AuthService = {
  token: string | null
  getToken: () => string | null
  setToken: (token: string) => void
  removeToken: () => void
  getUserData: () => UserFromToken | null
}

const TOKEN_KEY = 'vue-users-todo-token'

export const authService: AuthService = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  getToken() {
    return this.token
  },

  setToken(token) {
    this.token = token
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken() {
    this.token = null
    localStorage.removeItem(TOKEN_KEY)
  },

  getUserData() {
    if (!this.token) {
      return null
    }

    const tokenPayload: TokenPayload = JSON.parse(atob(this.token.split('.')[1]))

    return {
      id: tokenPayload.sub,
      name: tokenPayload.username,
      email: tokenPayload.email,
      permissions: tokenPayload.permissions
    }
  }
}
