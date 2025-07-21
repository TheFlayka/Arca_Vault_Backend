import { AllResponse, ISuccessResponse } from '#src/types/response.types.js'

export function isSuccess<T>(res: AllResponse<T>): res is ISuccessResponse<T> {
  return res.success === true
}
