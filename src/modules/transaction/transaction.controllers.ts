// Express
import { Request, Response } from 'express'

// Shared Functions
import { sendErrorResponse } from '#shared/index.js'
import { createTransaction } from './transaction.models.js'

export const createTransactionController = async (req: Request, res: Response) => {
  try {
    const result = await createTransaction(req.cookies.accessToken, req.body)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при создании транзакции', 500, error))
  }
}
