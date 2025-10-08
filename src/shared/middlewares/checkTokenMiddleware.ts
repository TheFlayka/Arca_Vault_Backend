import { NextFunction, Request, Response } from 'express'
import { sendErrorResponse } from '../response/sendResponse.js'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } from '#src/env.js'

export const checkAccessTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies) return res.status(401).json(sendErrorResponse('Необходима авторизация', 401))
    if (!req.cookies.accessToken) return res.status(401).json(sendErrorResponse('Сессия не найдена, войдите снова', 401))

    jwt.verify(req.cookies.accessToken, JWT_SECRET_ACCESS as string, (err: VerifyErrors | null) => {
      if (err) {
        return res.status(401).json(sendErrorResponse('Сессия устарела или недействительна', 401))
      }
    })
    next()
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при проверке полей', 500, error))
    return
  }
}

export const checkRefreshTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies) return res.status(401).json(sendErrorResponse('Необходима авторизация', 401))
    if (!req.cookies.refreshToken) return res.status(401).json(sendErrorResponse('Сессия не найдена, войдите снова', 401))
    jwt.verify(
      req.cookies.refreshToken,
      JWT_SECRET_REFRESH as string,
      (err: VerifyErrors | null) => {
        if (err) {
          return res
            .status(401)
            .json(sendErrorResponse('Срок действия сессии истёк, войдите заново', 401))
        }
      }
    )
    next()
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при проверке полей', 500, error))
    return
  }
}
