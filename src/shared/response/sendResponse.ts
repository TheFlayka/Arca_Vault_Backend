import { IErrorResponse, ISuccessResponse } from '#types/response.types.js'

export function sendErrorResponse(
  message = 'Ошибка',
  code = 500,
  errors: unknown = []
): IErrorResponse {
  return {
    status: code,
    success: false,
    message,
    errors: errors,
  }
}

export function sendSuccessResponse(
  message = 'Ошибка',
  code = 500,
  data: unknown = []
): ISuccessResponse {
  return {
    status: code,
    success: true,
    message,
    data: data,
  }
}
