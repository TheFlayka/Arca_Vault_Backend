export interface IPatternResponse {
  status: number
  success: boolean
  message: string
}

export type AllResponse<T = any, E = any> = IErrorResponse<E> | ISuccessResponse<T>

export interface IErrorResponse<E = any> extends IPatternResponse {
  errors: E
}

export interface ISuccessResponse<T = any> extends IPatternResponse {
  data: T
}
