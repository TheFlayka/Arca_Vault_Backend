import { AllResponse, ISuccessResponse } from '#types/response.types.js'

export function isSuccessResponse<T>(res: AllResponse<T>): res is ISuccessResponse<T> {
  return res.success === true
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
