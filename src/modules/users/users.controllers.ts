import { sendErrorResponse } from '#shared/index.js'
import { Request, Response } from 'express'
import { registerUser } from './index.js'

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}
