export enum Permission {
  UR = 'UR',
  UM = 'UM'
}

export type PermissionItem = {
  id: string;
  name: string;
};

export type TokenPayload = {
  sub: number
  username: string
  email: string
  permissions: Permission[]
  iat: number
  exp: number
}

export type UserFromToken = {
  id: number
  name: string
  email: string
  permissions: Permission[]
}

export type LoginApiParams = {
  email: string
  password: string
}

export type LogoutApiParams = {
  userId: number
}
