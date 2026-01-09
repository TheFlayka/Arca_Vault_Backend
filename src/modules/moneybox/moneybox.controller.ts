// Express
import { Request, Response } from 'express'

// Shared Functions
import { sendErrorResponse } from '#shared/index.js'

// Models Functions
import { createMoneybox } from './moneybox.models.js'


export const createMoneyboxController = async (req: Request, res: Response) => {
  try {
    const result = await createMoneybox(req.cookies.accessToken, req.body)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}