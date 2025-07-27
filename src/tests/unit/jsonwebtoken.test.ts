// Vitest
import { expect, test } from 'vitest'

// JWT
import jwt from 'jsonwebtoken'
import { decodeJWT } from '#shared/jwtDecode.js'
import { IJsonWebToken } from '#types/jwt.types.js'

// Token
import { JWT_SECRET_ACCESS } from '#src/env.js'

test('Проверка функций jwt', async () => {
  const testToken: string = jwt.sign({ _id: 'test' }, JWT_SECRET_ACCESS, { expiresIn: '15m' })

  const testObject: IJsonWebToken = decodeJWT(testToken)
  expect(testObject._id).toBe('test')
})
