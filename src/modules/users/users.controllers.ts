import { sendErrorResponse } from '#shared/index.js'
import { Request, Response } from 'express'
import { loginUser, registerUser } from './users.models.js'
import { isSuccess } from '#shared/isSuccess.js'
import { IToken } from './users.types.js'

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
    if (!isSuccess<IToken>(result))
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
    res.status(500).json(sendErrorResponse('Ошибка при регистраций пользователя', 500, error))
  }
}
