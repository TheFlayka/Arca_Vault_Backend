// Vitest
import { expect, test, describe } from 'vitest'

// Schema from Valibot
import * as v from 'valibot'
import { registrationSchema } from '../index.js'
import { AnyValibotObjectSchema } from '#types/objectSchema.types.js'

// One Function for all tests with validation
function expectValidation<S extends AnyValibotObjectSchema>(
  schema: S,
  data: unknown,
  toBe: boolean
) {
  const result = v.safeParse(schema, data)
  expect(result.success).toBe(toBe)
}

// Standard object (User)
const validUser = {
  login: 'testuser',
  password: 'password123',
  name: 'Test User',
  surname: 'User',
}

// Registration Schema Tests
describe('Проверка схемы регистрации пользователя', () => {
  test('Не валидные', () => {
    // Bad Login
    expectValidation(registrationSchema, { ...validUser, login: '' }, false)

    // Bad Login and Password
    expectValidation(registrationSchema, { ...validUser, login: '', password: '' }, false)

    // Bad Login, Password and Name(empty)
    expectValidation(registrationSchema, { ...validUser, login: '', password: '', name: '' }, false)

    // Bad Login and Name(empty), Password is valid
    expectValidation(
      registrationSchema,
      { ...validUser, login: '', password: 'validPassword', name: '' },
      false
    )
  })
  test('Валидные', () => {
    // Valid User
    expectValidation(registrationSchema, validUser, true)

    // Valid User with empty surname
    expectValidation(registrationSchema, { ...validUser, surname: '' }, true)
  })
})
