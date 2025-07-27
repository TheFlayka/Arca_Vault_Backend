import { IJsonWebToken } from '#types/jwt.types.js'
import { jwtDecode } from 'jwt-decode'

export function decodeJWT(token: string): IJsonWebToken {
  return jwtDecode<IJsonWebToken>(token)
}
