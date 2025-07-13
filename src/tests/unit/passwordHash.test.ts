// Vitest
import { expect, test } from 'vitest'
import bcrypt from 'bcrypt'

test('Проверка хеширования пароля', async () => {
  const password = 'testPassword123'
  const salt = await bcrypt.genSalt(10)
  const passwordHash: string = await bcrypt.hash(password, salt)

  // Проверка, что хеш не совпадает с исходным паролем
  expect(passwordHash).not.toBe(password)

  // Сравнение пароля с хешем
  const isMatch = await bcrypt.compare(password, passwordHash)
  expect(isMatch).toBe(true)

  // Ложное сравнение пароля с хешем
  const wrong = await bcrypt.compare('wrongPassword', passwordHash)
  expect(wrong).toBe(false)
})
