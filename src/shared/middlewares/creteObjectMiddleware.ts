// Express and Valibot Imports
import { NextFunction, Request, Response } from 'express'
import * as v from 'valibot'

// Types and Interfaces
import { sendErrorResponse } from '#shared/response/sendResponse.js'
type typeParseResult = ReturnType<typeof v.safeParse>

interface IErrorIssue {
  errorMessageKey: string
  key: string
}

// Middleware Function
export const createObjectMiddleware = <S extends v.ObjectSchema<any, any>>(schema: S) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const resultValidation: typeParseResult = v.safeParse(schema, req.body)

      if (!resultValidation.success) {
        const errors: Array<IErrorIssue> = resultValidation.issues.map((issue) => ({
          errorMessageKey: issue.message,
          key: issue.path?.map((path) => path.key).join('.') ?? '',
        }))
        res.status(400).json(sendErrorResponse('Ошибка в некоторых полях', 400, errors))
        return
      }

      next()
    } catch (error) {
      res.status(500).json(sendErrorResponse('Ошибка при проверке полей', 500, error))
    }
  }
}
