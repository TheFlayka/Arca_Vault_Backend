import { NextFunction, Request, Response } from 'express'
import { sendErrorResponse } from '#shared/response/sendResponse.js'

export const checkBodyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res
        .status(400)
        .json(sendErrorResponse('Не были получены какие-либо данные. Попробуйте еще раз', 400, []))
    }
    next()
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при проверке полей', 500, error))
  }
}
