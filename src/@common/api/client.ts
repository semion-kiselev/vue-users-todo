import ky from 'ky'
import { authService } from '@/auth/services/auth'

const createClient = (prefixUrl: string) =>
  ky.create({
    prefixUrl,
    timeout: false,
    retry: 0,
    hooks: {
      beforeRequest: [
        (request) => {
          const token = authService.getToken()
          if (token) {
            request.headers.set('authorization', `Bearer ${token}`)
          }
        }
      ]
    }
  })

export const client = createClient('http://localhost:3456')
