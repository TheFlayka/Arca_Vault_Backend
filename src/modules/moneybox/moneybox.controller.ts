// Express
import { Request, Response } from 'express'

// Shared Functions
import { newModelFunction, sendErrorResponse } from '#shared/index.js'

// Models Functions
import { createMoneybox } from './moneybox.models.js'

// Types
import { IModuleType } from '#types/module.types.js'
const module: IModuleType = { type: 'moneybox', case: 'копилки' }
import { moduleUser } from '#modules/common/common.types.js'

import { IUserFromDB } from '../common/common.types.js'
import { IMoneybox } from './moneybox.types.js'

export const createMoneyboxController = async (req: Request, res: Response) => {
  try {
    const result = await newModelFunction<IUserFromDB, IMoneybox>(
      createMoneybox,
      moduleUser,
      req.cookies.accessToken,
      req.body
    )
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}