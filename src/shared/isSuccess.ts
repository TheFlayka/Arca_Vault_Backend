import { AllResponse, ISuccessResponse } from '#types/response.types.js'

export function isSuccess<T>(res: AllResponse<T>): res is ISuccessResponse<T> {
  return res.success === true
}
