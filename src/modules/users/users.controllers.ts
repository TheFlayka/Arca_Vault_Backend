// Express
import { Request, Response } from 'express'

// Models & Types
import {
  changePasswordUser,
  changeUser,
  deleteUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from './users.models.js'
import { IChangePassword, IToken, IUserFromDB, UpdateUserObject } from './users.types.js'

import { IModuleType } from '#types/module.types.js'
const module: IModuleType = { type: 'users', case: 'пользователя' }

// Shared Functions
import { newModelFunction, sendErrorResponse } from '#shared/index.js'
import { isSuccessResponse } from '#shared/isSuccess.js'

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body)
    if (!isSuccessResponse<IToken>(result))
      return res.status(result.status).json(sendErrorResponse(result.message, result.status))

    const expiryDate30Days = new Date()
    expiryDate30Days.setDate(expiryDate30Days.getDate() + 30)

    const expiryDate = new Date()
    expiryDate.setMinutes(expiryDate.getMinutes() + 15)

    res.cookie('accessToken', result.data.access, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expiryDate,
    })
    res.cookie('refreshToken', result.data.refresh, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expiryDate30Days,
    })
    const { data, ...resultDone } = result
    res.status(resultDone.status).json(resultDone)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при авторизаций пользователя', 500, error))
  }
}

export const getUserController = async (req: Request, res: Response) => {
  try {
    const result = await newModelFunction<IUserFromDB>(getUser, module, req.cookies.accessToken)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Ошибка при получений данных пользователя', 500, error))
  }
}

export const changeUserController = async (req: Request, res: Response) => {
  try {
    const result = await newModelFunction<IUserFromDB, UpdateUserObject>(changeUser, module, req.cookies.accessToken, req.body)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Не удалось обновить данные пользователя', 500, error))
  }
}

export const changePasswordUserController = async (req: Request, res: Response) => {
  try {
    const result = await newModelFunction<IUserFromDB, IChangePassword>(
      changePasswordUser,
      module,
      req.cookies.accessToken,
      req.body
    )
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Не удалось обновить данные пользователя', 500, error))
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const result = await newModelFunction<IUserFromDB>(
      deleteUser,
      module,
      req.cookies.accessToken
    )
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Не удалось удалить пользователя', 500, error))
  }
}

export const logoutUserController = async (req: Request, res: Response) => {
  try {
    const result = await newModelFunction<IUserFromDB>(logoutUser, module, req.cookies.accessToken)
    if (!result.success) return res.status(result.status).json(result)

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(result.status).json(result)
  } catch (error) {
    res.status(500).json(sendErrorResponse('Не удалось удалить пользователя', 500, error))
  }
}
