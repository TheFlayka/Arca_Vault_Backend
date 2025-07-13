export interface IPatternResponse {
  status: number
  success: boolean
  message: string
}

export type AllResponse<T = unknown, E = unknown> = IErrorResponse<E> | ISuccessResponse<T>

export interface IErrorResponse<E = unknown> extends IPatternResponse {
  errors: E
}

export interface ISuccessResponse<T = unknown> extends IPatternResponse {
  data: T
}
