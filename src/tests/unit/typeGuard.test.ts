// Vitest
import { expect, test } from 'vitest'

// Shared Functions
import { sendSuccessResponse } from '#shared/index.js'
import { isString, isSuccessResponse } from '#shared/isSuccess.js'

describe('Проверка type guard функций', async () => {
  ;(test('Проверка isSuccessResponse', async () => {
    const response = sendSuccessResponse('success', 200, { test: 'test', number: 3 })

    interface ITestResponse {
      test: string
      number: number
    }

    const result1 = isSuccessResponse<ITestResponse>(response)
    expect(result1).toBe(true)

    const result2 = isSuccessResponse<ITestResponse>({
      ...response,
      success: false,
    })
    expect(result2).toBe(false)
  }),
    test('Проверка isString', async () => {
      const result1 = isString(2)
      expect(result1).toBe(false)

      const result2 = isString('3')
      expect(result2).toBe(true)
    }))
})
