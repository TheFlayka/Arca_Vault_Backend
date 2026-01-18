// Express
import { Request, Response } from 'express'

// Shared Functions
import { sendErrorResponse } from '#shared/index.js'

// Models Functions
import { createMoneybox, deleteMoneybox, getMoneyboxes, restoreMoneybox } from './moneybox.models.js'

export const createMoneyboxController = async (req: Request, res: Response) => {
  try {
    const result = await createMoneybox(req.cookies.accessToken, req.body)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}

export const getMoneyboxesController = async (req: Request, res: Response) => {
  try {
    const result = await getMoneyboxes(req.cookies.accessToken)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}

export const deleteMoneyboxController = async (req: Request, res: Response) => {
  try {
    const result = await deleteMoneybox(req.cookies.accessToken, req.params.id)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}

export const restoreMoneyboxController = async (req: Request, res: Response) => {
  try {
    const result = await restoreMoneybox(req.cookies.accessToken, req.params.id)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}

